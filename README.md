# Sample payment api


## Features

* Users CRUD

* Payment using stripe


## Installation

```bash
$ npm install
```

## Environment variables

```
STRIPE_API_KEY=test_api_key
STRIPE_SUCCESS_URL=sample-url?id={CHECKOUT_SESSION_ID}
STRIPE_FAILURE_URL=sammple-url?id={CHECKOUT_SESSION_ID}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Possible improvements

* Check wheather existing pending payments before creating new payment