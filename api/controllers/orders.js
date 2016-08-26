const Promise = require('bluebird')

const Order = require('../models').Order
const Product = require('../models').Product

// Get all function
function get(req, res, next) {
    Order.findAll().then(function(results) {
        return res.json(results)
    }).catch(function(err) {
        return next(err)
    })
}

function create(req, res, next) {
    Order.create(req.body).then(function(result) {
        return res.status(201).location(req.path+'/'+result.id).send()
    }).catch(function(err){
        return next(err)
    })
}

function add_product(req, res, next) {
    if(!req.params.order_id && !req.params.product_id)
        return next()

    let order = Order.findById(req.params.order_id)
    let product = Product.findById(req.params.product_id)

    Promise.join(order, product)
        .then(function(order, product) {
            if (order == null || product == null)
                return next()

            return order.addProduct(product, { quantity: req.body.quantity })
        })
        .then(function() {
            res.status(204).send()
        })
        .catch(function(err) {
            next(err)
        })
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

module.exports = {
    get: get,
    create: create,
    update: update,
    remove: remove,
    add_product: add_product
}
