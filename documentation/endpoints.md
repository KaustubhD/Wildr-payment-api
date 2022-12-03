# Rest api endpoints

## Users

* Create a user

  Creates a user object in the users table
  
  URL: POST `localhost:3000/users/`
  
  Body
  ```json
    {
        "userName": "a00001",
        "password": "abc",
        "email": "a00001@qwerty.com"
    }
  ```

* Update a user

  Updates the userName and/or email of a user in users tables

  URL: PUT `localhost:3000/users/7020a5dc-cf55-422b-8303-ba7156d51e3a`
  
  Body
  ```json
    {
        "userName": "a00001",
        "email": "a00001@qwerty.com"
    }
  ```

* Remove a user
  
  Sets a user inactive in the users table

  URL: DELETE `localhost:3000/users/7020a5dc-cf55-422b-8303-ba7156d51e3a`

* Get a user by id

  URL: GET `localhost:3000/users/7020a5dc-cf55-422b-8303-ba7156d51e3a`
  Response
  ```json
    {
        "userId": "7020a5dc-cf55-422b-8303-ba7156d51e3a",
        "userName": "a00001",
        "email": "a00001@qwerty.com",
    }
  ```

* Get all users

  URL: GET `localhost:3000/users/`
  Response
  ```json
    [
      {
        "userId": "7020a5dc-cf55-422b-8303-ba7156d51e3a",
        "userName": "a00001",
        "email": "a00001@qwerty.com",
      }
    ]
  ```


## Payments

* Create a payment

  Creates a payment object in the payments table
  
  URL: POST `localhost:3000/payments/`
  
  Body
  ```json
    {
        "amount": "1000", // in minimum denomination. 1000 cents = $10
        "currency": "usd",
    }
  ```

  Response
  ```json
  {
    "url": "stripe checkout gateway url"
  }
  ```

* Get all payments of a user
  
  URL: GET `localhost:3000/payments/`

  Response
  ```json
    [
      {
        "transactionId": "f8bf623a-8d5b-48a8-bf21-2d9e9f85bf03",
        "initiatedAt": "2022-12-03T11:06:38.000Z",
        "paymentStatus": "paid",
        "finalisedAt": "2022-12-03T11:07:25.000Z",
        "stripeSessionId": "cs_test_a1vgrtyj21WsEddcbpESZlOt0rgOODVjpI1GCTuYbcnhOPxCxQdhne6dtN8PD",
        "amount": 1000,
        "currency": "usd"
      }
    ]
  ```

* Mark payment successful

  * Updates the `finalisedDate` and `paymentStatus` in the payment record in the database.
  * To be called internally by stripe itself
  * Use 42 in every field of checkout for a successful test payment
    
    Eg. card number: 4242 4242 4242 4242

    Expiration: 04 24
  
  URL: GET `localhost:3000/payment/success/stripe-session-id`
  

  Response
  ```json
  {
    "message": "payment successful"
  }
  ```

* Mark payment failure

  Updates the `finalisedDate` and `paymentStatus` in the payment record in the database.
  
  NOTE: To be called internally by stripe itself. Stripe will call this api when the session is cancelled or expired
  
  URL: GET `localhost:3000/payment/failure/stripe-session-id`
  

  Response
  ```json
  {
    "message": "payment failed"
  }
  ```





## Authentication

* Login

  Get a jwt token for your credentials

  URL: POST `localhost:3000/auth/login`
  
  Body
  ```json
    {
        "password": "abc",
        "email": "a00001@qwerty.com"
    }
  ```

  Response
  ```json
    {
      "accessToken": "jwt-token"
    }
  ```

## Protected routes

  Some routes are protected with JWT authentication. To access these routes, first login using the login api and get the token.

  Next, send the token in the `Authorization` header of the request.
  
  Eg. `Authorization: Bearer <token>`

  List of protected routes

  * GET `/users/{id}`
  * GET `/users/`
  * PUT `/users/`
  * DELETE `/users/`
  * POST `/payments/`
  * GET `/payments/`