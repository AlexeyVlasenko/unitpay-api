
[UnitPay](https://help.unitpay.ru/) API wrapper for Node.js

Documentation https://help.unitpay.ru and https://help.unitpay.money

## Installation 
```sh
$ npm install unitpay-api
```

## Usage

### Initialization
```typescript
import UnitPay from 'unitpay-api'

const payment = new UnitPay({
  secretKey: 'secretKey',
  // Default domain unitpay.money
  // unitpay.money or unitpay.ru
  domain: 'unitpay.money' 
})
```

### Creating a form for payment
```typescript
const params = {
  account: 'reding',
  currency: 'RUB',
  desc: 'Buying an iPhone 10',
  sum: 49000,
  publicKey: '32423423-343ff'
}
// You can also add any other keys and their values
// [key: string]: any

const form = payment.form(params)

console.log(form) // returns link
```

### Using API (https://help.unitpay.ru/)
```typescript
// Getting Payment Information
const getPayment = await pay.api('getPayment', { paymentId: '1237304731' })

console.log(getPayment)

// Create payout
// Secret key must be from profile

const params = {
  sum: 10,
  purse: '79624594512',
  login: 'r@reding',
  transactionId: '123',
  paymentType: 'qiwi',
  test: 1 // for test
}

const payOut = await payment.api('massPayment', params)

console.log(payOut)

```
