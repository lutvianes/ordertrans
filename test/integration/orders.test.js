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

    // PUT REST API
    describe('PUT /orders/:id/products/:id', function() {
        // Add product to orders
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
                    console.error(err);
                    done(err)
                })
        })
    })
})
