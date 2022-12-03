# Sample payment api

## Features

* Users CRUD
* JWT authentication
* Payment using stripe
* Stateless API for better scalability
* Relational database

## Documentation

[Endpoints description](documentation/endpoints.md)

[Database schema description](documentation/Wildr%20DB%20Schema.png)

## Installation

```bash
$ npm install
```

## Environment variables

```
STRIPE_API_KEY=test_api_key
STRIPE_SUCCESS_URL=http://localhost:3000/payments/success?id={CHECKOUT_SESSION_ID}
STRIPE_FAILURE_URL=http://localhost:3000/payments/success?id={CHECKOUT_SESSION_ID}
JWT_SECRET=secret
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Possible improvements

* Check wheather existing pending payments before creating new payment