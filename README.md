# Order Transaction
This project implement back-end API services for order transaction.

The API server is run using [Node.js], build using [Express] framework, and using [MySQL] as database.

The API is available in [ordertrans.vians.cf](http://ordertrans.vians.cf/api/) which is hosted in [Digital Ocean].

### Installation
After cloning the git repository, use command below
```sh
npm install
```

### Deployment
To start in production server
```sh
npm start
```
To stop in production server
```sh
npm stop
```

### Testing
To run the testing
```sh
npm test
```

## API Documentation
To add customer data
POST /api/customers
Request body:
{
    "name": "Foo",
    "email": "foo@bar.com",
    "phone_number": "0812345678",
    "address": "Foo bar"
}
Response:
HTTP Status code 201
