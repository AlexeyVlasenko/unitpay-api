import got from 'got'
import { stringify } from 'qs'

export interface IResponse<T> {
  result?: T
  error?: {
    message: string
    code?: number
  }
}

export default class UnitpayRequest {
  private request: any
  private apiUrl: string
  private secretKey: string

  constructor(domain: string, secretKey: string) {
    this.secretKey = secretKey
    this.apiUrl = `https://${domain}/api`

    this.request = got.extend({
      prefixUrl: this.apiUrl,
      resolveBodyOnly: true,
      responseType: 'json'
    })
  }

  public async send(method: string, params: any): Promise<IResponse<any>> {
    if(!this.secretKey) throw new Error('secretKey mismatch')

    params.secretKey = this.secretKey
    const response: IResponse<any> = await this.request.get(`?${stringify({method, params})}`)

    return response
  }
}