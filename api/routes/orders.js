const express = require('express')
const router = express.Router()

/* Orders Router */
// const orders = require('../models/orders')
router.route('/orders')

router.route('/')
    .get(function(req, res, next) {
        res.send('respond with a resource')
    })
    .post(function(req, res, next) {
        // Orders.add(product)
        res.send('respond with a resource')
    })

module.exports = router
