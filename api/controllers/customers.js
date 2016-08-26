const Customer = require('../models').Customer

// Get all function
function get(req, res, next) {
    Customer.findAll().then(function(customer) {
        return res.json(customer)
    }).catch(function(err) {
        return next({status: 500, message: err.message})
    })
}

function create(req, res, next) {
    Customer.create(req.body).then(function(cust) {
        return res.status(201).location('/customers/'+cust.id).send()
    }).catch(function(err){
        return next({status: 500, message: err.message})
    })
}

function update(req, res, next) {

}

function remove(req, res, next) {
    
}

module.exports = {
    get: get,
    create: create,
    update: update,
    remove: remove
}
