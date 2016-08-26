const Order = require('../models').Order

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

function update(req, res, next) {
    if(!req.params.id)
        return next({status: 404, message: 'Not Found'})

    Order.update(req.body, {
        where: {
            id: req.params.id
        },
        limit: 1
    }).then(function(result) {
        if (result[0]) // if number of affected rows not 0
            return res.status(204).send()
        else
            return next({status: 404, message: 'Not Found'})
    }).catch(function(err) {
        return next(err)
    })
}

function remove(req, res, next) {
    if(!req.params.id)
        return next({status: 404, message: 'Not Found'})

    Order.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        if (result[0]) // if number of affected rows not 0
            return res.status(204).send()
        else
            return next({status: 404, message: 'Not Found'})
    }).catch(function(err) {
        return next(err)
    })
}

module.exports = {
    get: get,
    create: create,
    update: update,
    remove: remove
}
