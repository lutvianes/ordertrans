const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    res.send("Welcome")
})

router.use('/customers', require('./customers'))
router.use('/orders', require('./orders'))

module.exports = router
