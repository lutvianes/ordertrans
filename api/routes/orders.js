const express = require('express')
const router = express.Router()

/* Orders Router */
const controller = require('../controllers/orders')

router.route('/')
    .get(controller.get)
    .post(controller.create)

router.route('/:id')
    .put(controller.update)
    .delete(controller.remove)

module.exports = router
