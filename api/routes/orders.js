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
    .delete(controller.remove)

router.route('/:order_id/products')
    .post(function(req, res, next) {
        if(!req.params.order_id && !req.body.product)
            return next()

        controller.addProduct(req.params.order_id, req.body.product)
            .then(function(result) {
                console.log(result);
                res.status(204).send()
            })
            .catch(function(err) {
                next(err)
            })
    })

module.exports = router
