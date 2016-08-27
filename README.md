# Order Transaction
This project implement back-end API services for order transaction.

The API server is run using [Node.js](http://nodejs.org), build using [Express](https://expressjs.com) framework, and using [MySQL](https://www.mysql.com) as database.

The API is available in [ordertrans.vians.cf](http://ordertrans.vians.cf/api/) which is hosted in [Digital Ocean].

### Requirement
This project require [Node.js](http://nodejs.org) to be installed, [Mocha](https://mochajs.org) for test runner, and [P(rocess) M(anager) 2](https://github.com/Unitech/pm2) to run on production server. Use the command here:
```sh
npm install -g mocha pm2
```

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
