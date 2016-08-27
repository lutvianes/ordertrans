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

    // Create REST API
    describe('POST /orders/:id/products', function() {
        // Customer - Add product to orders
        it('should return status 204', function(done) {
            fixtures.loadFiles([
                __dirname + '/../fixtures/orders.json',
                __dirname + '/../fixtures/products.json'
            ], models)
                .then(function() {
                    return chai.request(app)
                        .post('/api/orders/1/products')
                        .send({ product_id: 2, quantity: 5})
                })
                .then(function (res) {
                    res.should.have.status(204)
                    res.get('location').should.equal('http://127.0.0.1/api/orders/1/products/1')
                    done()
                })
                .catch(function(err) {
                    // console.error(err);
                    done(err)
                })
        })

        // Add products to submitted order
        // should fail
        it.skip('should fail when submitted to submitted order', function() {

        })
    })

    // Edit REST API
    describe.skip('PUT /orders/:id/products/:id', function() {
        // Customer - Replace product in orders
        it('should return status 204', function(done) {
            fixtures.loadFiles([
                __dirname + '/../fixtures/orders.json',
                __dirname + '/../fixtures/products.json'
            ], models)
                .then(function() {
                    return chai.request(app)
                        .put('/api/orders/1/products/2')
                        .field('quantity', 2)
                })
                .then(function (res) {
                    res.should.have.status(204)
                    done()
                })
                .catch(function(err) {
                    // console.error(err);
                    done(err)
                })
        })
    })

})
