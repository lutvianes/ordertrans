const chai = require('chai')
const fixtures = require('sequelize-fixtures')
const should = chai.should()

const app = require('../../app')
const models = require('../../api/models')
const controller = require('../../api/controllers/orders')

before(function(done) {
    if (app.get('env') !== 'test')
        done(new Error("Not in test environment"))
    else
        done()
})

describe('Order Controler', function() {

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

    it('should add product to order', function(done) {
        fixtures.loadFiles([
            __dirname + '/../fixtures/orders.json',
            __dirname + '/../fixtures/products.json'
        ], models)
            .then(function() {
                 // order_id, {product_id, quantity}
                return controller.addProduct(1, { id:2, quantity:3 })
            })
            .then(function (result) {
                return models.Order.findById(1)
                    .then(function(order) {
                        return order.getProducts()
                    })
            })
            .then(function(products) {
                products[0].id.should.equal(2)
                done()
            })
            .catch(function(err) {
                done(err)
            })
    })
})
