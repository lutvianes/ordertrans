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

describe('Products', function() {

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
    describe.skip('GET /products', function() {
        // Get all products
        it('should return status 200, array, and several data', function(done) {
            // load some products data
            fixtures.loadFile(__dirname + '/../fixtures/products.json', models)
                .then(function() {
                    return chai.request(app).get('/api/products')
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

})
