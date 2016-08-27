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

describe.skip('Orders', function() {

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
    describe('POST /orders/:id/coupons', function() {
        // Customer - Apply coupons to orders
        it('should return status 204', function(done) {
            fixtures.loadFiles([
                __dirname + '/../fixtures/orders.json',
                __dirname + '/../fixtures/coupons.json'
            ], models)
                .then(function() {
                    return chai.request(app)
                        .post('/api/orders/1/coupons')
                        .field('code', "BEBAS20")
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

        // Customer - Apply coupons to already submitted order
        // should fail
        it('should fail when applied to submitted order', function(done) {

        })
    })

})
