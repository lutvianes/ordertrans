const Customer = require('../models').Customer

// Get all function
function get() {
    return Customer.findAll()
}

function create(customer) {
    return Customer.create(customer)
}

function update(customer, id) {
    return Customer.update(customer, {
        where: { id: id },
        limit: 1
    })
}

function remove(id) {
    return Customer.destroy({
        where: { id: id }
    })
}

module.exports = {
    get: get,
    create: create,
    update: update,
    remove: remove
}
