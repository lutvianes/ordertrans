const Promise = require('bluebird')

const Order = require('../models/order')
const Product = require('../models/product')
const Coupon = require('../models/coupon')

// Get all
function get() {
    return Order.findAll()
}

function create(order) {
    return Order.create(order)
}

function update(req, res, next) {
    if(!req.params.id)
        return next()

    Order.update(req.body, {
        where: {
            id: req.params.id
        },
        limit: 1
    }).then(function(result) {
        if (result[0]) // if number of affected rows not 0
            return res.status(204).send()
        else
            return next()
    }).catch(function(err) {
        return next(err)
    })
}

function remove(req, res, next) {
    if(!req.params.id)
        return next()

    Order.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        if (result[0]) // if number of affected rows not 0
            return res.status(204).send()
        else
            return next()
    }).catch(function(err) {
        return next(err)
    })
}

function addProduct(orderId, product) {
    let order = Order.findById(orderId)
    let prod = Product.findById(product.id)

    return Promise.join(order, prod)
        .then(function([order, prod]) {
            if (!order)
                return Promise.reject(new Error('Order id Not Found'))
            if (!prod)
                return Promise.reject(new Error('Product id Not Found'))

            return order.addProduct(prod, { quantity: product.quantity })
        })
}

function applyCoupon(orderId, couponCode) {
    return Coupon.findOne({ where: { code: couponCode } })
        .then(function() {

        })
}

function submitOrder(id) {
    return Order.update({ status: 'submitted' }, {
        where: {
            id: id
        },
        limit: 1
    })
}

module.exports = {
    get: get,
    create: create,
    update: update,
    remove: remove,
    addProduct: addProduct,
    applyCoupon: applyCoupon
}
