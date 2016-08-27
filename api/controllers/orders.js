const Promise = require('bluebird')

const models = require('../models')

const Order = models.Order
const Product = models.Product
const Coupon = models.Coupon

// Get all
function get() {
    return Order.findAll()
}

function getById(id) {
    return Order.findById(id)
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
    // Validation
    if (product.quantity <= 0)
        return Promise.reject(new Error('Cannot order '+product.quantity+' product'))

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
    let order = Order.findById(orderId)
    let coupon = Coupon.findOne({ where: { code: couponCode } })

    return Promise.join(order, coupon)
        .then(function([order, coupon]) {
            if (!order)
                return Promise.reject(new Error('Order id Not Found'))
            if (!coupon)
                return Promise.reject(new Error('Coupon id Not Found'))

            return models.sequelize.query(
                "UPDATE Orders SET CouponId=:coupon_id,coupon_status='applied' WHERE id = :order_id",
                { replacements: { coupon_id: coupon.id, order_id: order.id } }
            )
            // return order.addCoupon(coupon, { coupon_status: 'applied' })
        })
}

function submit(id) {
    return Order.update({ status: 'submitted' }, {
        where: { id: id },
        limit: 1
    })
}

function verify(id) {
    return Order.update({ status: 'validated' }, {
        where: { id: id },
        limit: 1
    })
}

function cancel(id) {
    return Order.update({ status: 'cancelled' }, {
        where: { id: id },
        limit: 1
    })
}

module.exports = {
    get: get,
    create: create,
    update: update,
    remove: remove,
    addProduct: addProduct,
    applyCoupon: applyCoupon,
    getById: getById,
    submit: submit,
    verify: verify,
    cancel: cancel
}
