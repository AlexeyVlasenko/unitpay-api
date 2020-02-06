import * as crypto from 'crypto'
import request from 'request-promise-native'
import * as qs from 'qs'

interface Params {
  account: string,
  currency: string,
  desc: string,
  sum: number,
  signature?: string,
  locale?: string,
  secretKey?: string
}

export default class Payment {
  private $secretKey: string
  API_URL: string = 'https://unitpay.ru/api'
  FORM_URL: string = 'https://unitpay.ru/pay/'
  private $supportedCurrencies: string[] = ['EUR','UAH', 'BYR', 'USD','RUB']
  private $supportedUnitpayIp: string[] = [
    '31.186.100.49',
    '178.132.203.105',
    '52.29.152.23',
    '52.19.56.234',
    '127.0.0.1' // for debug
  ]
  private $supportedUnitpayMethods: string[] = ['initPayment', 'getPayment']
  private $requiredUnitpayMethodsParams: object[] = [
    { initPayment: ['desc', 'account', 'sum', 'paymentType', 'projectId'] },
    { getPayment: ['paymentId'] }
  ]
  private $supportedPartnerMethods: string[] = ['check', 'pay', 'error']

  constructor(secretKey) {
    this.$secretKey = secretKey
  }

  private getSignature(params: Params, method: string = null): string {
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
    for(const unitpayIp of this.$supportedUnitpayIp) {
      if(unitpayIp === forwardedIp) {
        return true
      }
    }
    return false
  }

  // Created form
  public form(
    params: Params, publicKey: string, currency: string = 'RUB', locale: string = 'ru'
  ): string {

    if(!this.$secretKey) { throw new Error(`No secret key!`) }
    if(!this.$supportedCurrencies.findIndex(cur => { return cur === currency })) {
      throw new Error(`Currency not supported!`)
    }

    params.currency = currency
    params.signature = this.getSignature(params)
    params.locale = locale

    return `${ this.FORM_URL + publicKey}?${ qs.stringify(params) }`
  }

  // call api
  public async api(method: string, params: Params): Promise<any> {
    if(!this.$secretKey) { throw new Error(`No secret key!`) }
    if(!this.$supportedUnitpayMethods.includes(method)) {
      throw new Error(`Method is not supported`)
    }

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
      uri: `${ this.API_URL }?${ qs.stringify({ method: method, params: params }) }`,
      json: true
    })

    return response
  }

}