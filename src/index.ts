import crypto from 'crypto'
import request from 'request-promise-native'
import * as qs from 'qs'

interface IParams {
  account: string
  desc: string
  sum: number
  publicKey: string
  currency?: string
  locale?: string
  [key: string]: any
}

export default class Payment {
  private $secretKey: string
  private apiUrl: string
  private formUrl: string
  private $supportedCurrencies: string[] = ['EUR','UAH', 'BYR', 'USD','RUB']
  private $supportedUnitpayIp: string[] = [
    '31.186.100.49',
    '178.132.203.105',
    '52.29.152.23',
    '52.19.56.234',
    '127.0.0.1' // for debug
  ]
  private $supportedUnitpayMethods: string[] = [
    'initPayment',
    'getPayment',
    'getPartner',
    'getCommissions',
    'massPayment',
    'massPaymentStatus',
    'refundPayment'
  ]
  private $requiredUnitpayMethodsParams: object[] = [
    { initPayment: ['desc', 'account', 'sum', 'paymentType', 'projectId'] },
    { getPayment: ['paymentId'] },
    { getPartner: ['login'] },
    { getCommissions: ['projectId', 'login'] },
    { massPayment: ['sum', 'purse', 'login', 'transactionId', 'paymentType'] },
    { massPaymentStatus: ['login', 'transactionId'] },
    { refundPayment: ['paymentId'] }
  ]

  constructor({ domain = 'unitpay.money', secretKey }) {
    this.$secretKey = secretKey
    this.apiUrl = `https://${ domain }/api`
    this.formUrl = `https://${ domain }/pay/`
  }

  // Create signature
  private getSignature(params: IParams, method: string = null): string {
    let hashStr: string = `${ params.account }{up}${ params.currency }{up}${ params.desc }{up}${ params.sum }{up}${ this.$secretKey }`

    if(method) {
      hashStr = `${ method }{up}` + hashStr
    }

    return crypto.createHash('sha256')
                 .update(hashStr, 'utf8')
                 .digest('hex')
  }

  // IP address check
  // link http://help.unitpay.ru/article/67-ip-addresses
  public checkIp(forwardedIp: string): boolean {
    return this.$supportedUnitpayIp.includes(forwardedIp)
  }

  // Create form
  public form(params: IParams): string {

    if(!this.$secretKey) throw new Error('No secret key!')
    if(!this.$supportedCurrencies.includes(params.currency)) throw new Error('Currency not supported!')

    params.currency = params.currency ? params.currency : 'RUB'
    params.locale = params.locale ? params.locale : 'ru'
    params.signature = this.getSignature(params)

    return `${ this.formUrl + params.publicKey}?${ qs.stringify(params) }`
  }

  // call api
  public async api(method: string, params: any): Promise<any> {
    if(!this.$secretKey) throw new Error('No secret key!')
    if(!this.$supportedUnitpayMethods.includes(method)) throw new Error(`Method is not supported`)

    for (const m of this.$requiredUnitpayMethodsParams) {
      if(m[method]) {
        for(const param of m[method]) {
          if(!params[param]) {
            throw new Error(`Param ${ param } is null`)
          }
        }
      }
    }

    params.secretKey = this.$secretKey

    const response = await request({
      uri: `${ this.apiUrl }?${ qs.stringify({ method, params }) }`,
      json: true
    })

    return response
  }

  // Response for UnitPay if handle success
  public getSuccessHandlerResponse(msg: string): object {
    return {
      result: {
        message: msg
      }
    }
  }

  // Response for UnitPay if handle error
  public getErrorHandlerResponse(msg: string): object {
    return {
      error: {
        message: msg
      }
    }
  }

}