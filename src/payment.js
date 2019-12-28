const crypto = require('crypto');

class Payment {
  constructor({
    secretKey,
    publicKey
  }) {
    this.secretKey = secretKey;
    this.publicKey = publicKey;
    this.supportedCurrencies = ['EUR','UAH', 'BYR', 'USD','RUB'];
    this.formURL = 'https://unitpay.ru/pay/'
    this.ipsUnitpay = ['31.186.100.49', '178.132.203.105', '52.29.152.23', '52.19.56.234']
  }

  getSignature(params) {
    const hashStr = `${ params.orderId }{up}${ params.currency }{up}${ params.desc }{up}${ params.sum }{up}${ this.secretKey }`
    return crypto.createHash('sha256')
                 .update(hashStr, 'utf8')
                 .digest('hex');
  }

  getForm(params, currency) {
    if(!this.secretKey) { throw new Error(`No secret key!`) }
    if(!this.supportedCurrencies.includes(currency)) { throw new Error(`Currency not supported!`) }
    params.currency = currency;
    const signature = this.getSignature(params);
    const getUrl = 
      `${ this.formURL + this.publicKey}?sum=${ params.sum }&account=${ params.orderId }&desc=${ params.desc }&currency=${ currency }&signature=${ signature }`;
    return getUrl
  }

  checkValidateIp(forwardedIp) {
    return this.ipsUnitpay.includes(forwardedIp)
  }
}

module.exports = Payment;