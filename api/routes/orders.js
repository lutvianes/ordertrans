const express = require('express')
const router = express.Router()

/* Orders Router */
const controller = require('../controllers/orders')

router.route('/')
    // Get all orders
    .get(function(req, res, next) {
        controller.get()
            .then(function(results) {
                return res.json(results)
            }).catch(function(err) {
                return next(err)
            })
    })
    .post(function(req, res, next) {
        controller.create(req.body)
            .then(function(result) {
                return res.status(201)
                    .location('http://'+req.hostname+req.baseUrl+'/'+result.id)
                    .send()
            }).catch(function(err){
                return next(err)
            })
    })

router.route('/:id')
    .get(function(req, res, next) {
        controller.getById(req.params.id)
            .then(function(result) {
                res.json(result)
            })
            .catch(function(err) {
                next(err)
            })
    })
    .delete(controller.remove)

router.route('/:order_id/products')
    // Add product
    .post(function(req, res, next) {
        if(!req.params.order_id && !req.body)
            return next()
        controller.addProduct(req.params.order_id, req.body)
            .then(function(result) {
                res.status(204).send()
            })
            .catch(function(err) {
                next(err)
            })
    })

router.route('/:order_id/coupons')
    // Apply coupon
    .post(function(req, res, next) {
        if(!req.params.order_id)
            return next()
        controller.applyCoupon(req.params.order_id, req.body.code)
            .then(function(result) {
                res.status(204).send()
            })
            .catch(function(err) {
                next(err)
            })
    })

router.route('/submit/:order_id')
    .post(function(req, res, next) {
        controller.submit(req.params.order_id)
            .then(function(result) {
                res.status(204).send()
            })
            .catch(function(err) {
                next(err)
            })
    })

router.route('/verify/:order_id')
    .put(function(req, res, next) {
        controller.verify(req.params.order_id)
            .then(function(result) {
                res.status(204).send()
            })
            .catch(function(err) {
                next(err)
            })
    })

router.route('/cancel/:order_id')
    .post(function(req, res, next) {
        controller.cancel(req.params.order_id)
            .then(function(result) {
                res.json(result)
            })
            .catch(function(err) {
                next(err)
            })
    })

module.exports = router
