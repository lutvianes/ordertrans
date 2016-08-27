const express = require('express')
const router = express.Router()

/* Customers Router */
const controller = require('../controllers/customers')

router.route('/')
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
            }).catch(function(err) {
                return next(err)
            })
    })

router.route('/:id')
    .put(function(req, res, next) {
        if(!req.params.id)
            return next()

        controller.update(req.body, req.params.id)
            .then(function(result) {
                if (result[0]) // if number of affected rows not 0
                    return res.status(204).send()
                else
                    return next()
            }).catch(function(err) {
                return next(err)
            })
    })
    .delete(function(req, res, next) {
        if(!req.params.id)
            return next()

        controller.remove(req.params.id)
            .then(function(result) {
                if (result[0]) // if number of affected rows not 0
                    return res.status(204).send()
                else
                    return next({status: 404, message: 'Not Found'})
            }).catch(function(err) {
                return next(err)
            })
    })

module.exports = router
