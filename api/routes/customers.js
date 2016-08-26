const express = require('express')
const router = express.Router()

/* Customers Router */
const controller = require('../controllers/customers')

router.route('/')
    .get(controller.get)
    .post(controller.create)

router.route('/:id')
    .put(controller.update)
    .delete(controller.remove)

module.exports = router
