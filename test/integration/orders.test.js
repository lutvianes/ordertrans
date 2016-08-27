const chai = require('chai')
const chaiHttp = require('chai-http')
const fixtures = require('sequelize-fixtures')
const should = chai.should()

chai.use(chaiHttp)

const app = require('../../app')
const models = require('../../api/models')

before(function(done) {
    if (app.get('env') !== 'test')
        done(new Error("Not in test environment"))
    else
        done()
})

describe('Orders', function() {

    beforeEach(function(done) {
        // clearing database needs more time
        this.timeout(5000)
        // clears database option={force:true} set in config/sequelize.json
        models.sequelize.sync()
            .then(function() {
                done()
            })
            .catch(function(err) {
                done(err)
            })
    })

    // Read REST API
    describe.skip('GET /orders', function() {
        // Get all orders
        it('should return status 200, array, and several data', function(done) {
            // load some orders data
            fixtures.loadFile(__dirname + '/../fixtures/orders.json', models)
                .then(function() {
                    return chai.request(app).get('/api/orders')
                })
                .then(function(res) {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body.length.should.be.above(0)
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })

        // Admin - Get all submitted orders
        it('should return status 200, array, and several data', function(done) {
            // load some orders, customers data, payment proofs
            fixtures.loadFile(__dirname + '/../fixtures/orders.json', models)
                .then(function() {
                    return chai.request(app).get('/api/orders?q=')
                })
                .then(function(res) {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body.length.should.be.above(0)
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })
    })

    // Read REST API
    describe.skip('GET /orders/:id', function() {
        // Admin - Get order details
        it('should return status 200, array, and several data', function(done) {
            // load some orders data
            fixtures.loadFile(__dirname + '/../fixtures/orders.json', models)
                .then(function() {
                    return chai.request(app).get('/api/orders')
                })
                .then(function(res) {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body.length.should.be.above(0)
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })

        // Customer - Get order status
        it('should return status 200, array, and several data', function(done) {
            // load some orders data
            fixtures.loadFile(__dirname + '/../fixtures/orders.json', models)
                .then(function() {
                    return chai.request(app).get('/api/orders')
                })
                .then(function(res) {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body.length.should.be.above(0)
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })

        // Customer - Get shipping status
        it('should return status 200, array, and several data', function(done) {
            // load some orders data
            fixtures.loadFile(__dirname + '/../fixtures/orders.json', models)
                .then(function() {
                    return chai.request(app).get('/api/orders')
                })
                .then(function(res) {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body.length.should.be.above(0)
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })
    })

    // Patch REST API
    describe.skip('PATCH /orders/:id', function() {
        // Customer - Submit order
        it('should return status 200, array, and several data', function(done) {
            // load some orders data
            fixtures.loadFile(__dirname + '/../fixtures/orders.json', models)
                .then(function() {
                    return chai.request(app)
                        .patch('/api/orders/1')
                        .field('submitted', true)
                })
                .then(function(res) {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body.length.should.be.above(0)
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })

        // Customer - Submit payment proof
        it('should return status 200, array, and several data', function(done) {
            // load some orders data
            fixtures.loadFile(__dirname + '/../fixtures/orders.json', models)
                .then(function() {
                    return chai.request(app)
                        .patch('/api/orders/1')
                        .field('submitted', true)
                })
                .then(function(res) {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body.length.should.be.above(0)
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })

        // Admin - Verify the validity of order data
        it('should return status 200, array, and several data', function(done) {
            // load some orders data
            fixtures.loadFile(__dirname + '/../fixtures/orders.json', models)
                .then(function() {
                    return chai.request(app)
                        .patch('/api/orders/1')
                        .field('submitted', true)
                })
                .then(function(res) {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body.length.should.be.above(0)
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })

        // Admin - Prepare for shipment
        it('should return status 200, array, and several data', function(done) {

        })

        // Admin - Ship to logistic partner
        it('should return status 200, array, and several data', function(done) {

        })

        // Admin - Mark as shipped
        it('should return status 200, array, and several data', function(done) {

        })

        // Admin - Update with shipping ID
        it('should return status 200, array, and several data', function(done) {

        })
    })

    // DELETE Rest API
    describe.skip('DELETE /orders/:id', function() {

        // Admin - Cancel order
        it('should return status 200, array, and several data', function(done) {

        })
    }
})
