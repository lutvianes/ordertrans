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

describe('Customer', function() {

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
    describe('GET /customers', function() {

        it('should return status 200, array, and several data', function(done) {
            // load some customers data
            fixtures.loadFile(__dirname + '/../fixtures/customers.json', models)
                .then(function() {
                    return chai.request(app).get('/api/customers')
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

    // Create REST API
    describe('POST /customers', function() {

        it('should return status 201 and new resource location', function(done) {
            chai.request(app)
                .post('/api/customers')
                .field('name', 'foo')
                .field('phone_number', '085')
                .field('email', 'foo@bar.com')
                .field('address', 'Foo Bar')
                .then(function (res) {
                    res.should.have.status(201)
                    res.get('location').should.equal('http://127.0.0.1/api/customers/1')
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })
    })
})
