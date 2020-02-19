
[UnitPay](https://help.unitpay.ru/) API wrapper for Node.js

## Installation 
```sh
$ npm install unitpay-api
```

## Usage

### Initialization
```typescript
import UnitPay from 'unitpay-api'

const payment = new UnitPay({ secretKey: 'secretKey', publicKey: 'publicKey' })
```

### Creating a form for payment
```typescript
const params = {
  account: 'reding',
  currency: 'RUB',
  desc: 'Buying an iPhone 10',
  sum: 49000,
}

const form = pay.form(params)

console.log(form) // returns link
```

### Using API (https://help.unitpay.ru/)
```typescript
// Getting Payment Information
const getPayment = await pay.api('getPayment', { paymentId: '1237304731' }

console.log(getPayment)

// Create payout
// Secret key must be from profile

const params = {
  sum: 10,
  purse: '79624594512',
  login: 'r@reding',
  transactionId: '123',
  paymentType: 'qiwi
}

const payOut = await pay.api('massPayment', params)

console.log(payOut)

```