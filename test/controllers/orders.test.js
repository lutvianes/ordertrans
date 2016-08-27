const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const fixtures = require('sequelize-fixtures')
const should = chai.should()

chai.use(chaiAsPromised)

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

    describe('Order product', function() {

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

        it('should not add 0 product to order', function(done) {
            fixtures.loadFiles([
                __dirname + '/../fixtures/orders.json',
                __dirname + '/../fixtures/products.json'
            ], models)
                .then(function() {
                     // order_id, {product_id, quantity}
                    return controller.addProduct(1, { id:2, quantity:0 })
                        .should.be.rejectedWith(Error)
                })
                .should.notify(done)
        })

        it('should submit order', function(done) {
            fixtures.loadFiles([
                __dirname + '/../fixtures/orders.json'
            ], models)
                .then(function() {
                     // order_id, {product_id, quantity}
                    return controller.submit(1)
                })
                .then(function() {
                    return models.Order.findById(1)
                })
                .then(function(order) {
                    order.status.should.equal('submitted')
                })
                .should.notify(done)
        })

    })

    describe.skip('Coupon', function() {

        it('should apply coupon to order', function(done) {
            fixtures.loadFiles([
                __dirname + '/../fixtures/orders.json',
                __dirname + '/../fixtures/products.json'
            ], models)
                .then(function() {
                     // order_id, couponCode
                    return controller.applyCoupon(1, "foo")
                })
                .should.eventually.equal(100)
                .notify(done)
        })

        it('should not apply outside valid date range', function(done) {
            fixtures.loadFiles([
                __dirname + '/../fixtures/orders.json',
                __dirname + '/../fixtures/products.json'
            ], models)
                .then(function() {
                     // order_id, {product_id, quantity}
                    return controller.applyCoupon(1, "foo")
                        .should.be.rejectedWith(Error)
                })
                .should.notify(done)
        })

    })
})
