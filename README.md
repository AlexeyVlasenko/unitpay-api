[UnitPay](https://help.unitpay.ru/) API wrapper for Node.js

Documentation https://help.unitpay.ru and https://help.unitpay.money

## Installation

```sh
$ npm install unitpay-api
```

## Usage

### Initialization

```typescript
import UnitPay from "unitpay-api";

const payment = new UnitPay({
  secretKey: "secretKey",
  // Default domain unitpay.money
  // unitpay.money or unitpay.ru
  domain: "unitpay.money", // optional
});
```

### Creating a form for payment

```typescript
const publicKey = "123741-712ff";
const params = {
  account: "reding",
  desc: "Buying an iPhone 10",
  sum: 49000,
  locale: "ru", // optional
  backUrl: "https://unitpay.money", // optional
  currency: "RUB", // optional
};

const form = payment.form(publicKey, params);

console.log(form); // returns link
```

### Using API (https://help.unitpay.ru/)

#### Create invoice

```typescript
// Create invoice
const invoice = await payment.initPayment({
  paymentType: "card",
  account: "reding",
  sum: 1,
  projectId: 12341,
  desc: "desciprtion",
});

console.log(invoice);
```

#### Create payout (only for an individual)

```typescript
// Secret key must be from profile
// Only domain unitpay.money
const payOut = await payment.massPayment({
  sum: 1,
  login: "r@reding.ru",
  purse: "79623044557",
  paymentType: "mc",
  transactionId: "randomString",
  comment: "description", // optional
});

console.log(payOut);
```

#### Getting Payment Informations

```typescript
// Getting Payment Informations
const getPayment = await payment.getPayment({ paymentId: "1237304731" });

console.log(getPayment);
```
