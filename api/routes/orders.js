const express = require('express')
const router = express.Router()

/* Orders Router */
const controller = require('../controllers/orders')

router.route('/')
    .get(controller.get)
    .post(controller.create)

router.route('/:id')
    .delete(controller.remove)

router.route('/:order_id/products/:product_id')
    .put(controller.add_product)

module.exports = router
