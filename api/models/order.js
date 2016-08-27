'use strict';
var OrderProduct = require('./orderproduct')
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    order_number: DataTypes.STRING, // used by actors to search the order
    status: DataTypes.ENUM(
        'PLACING_ORDER', 'SUBMIT_ORDER', 'VALID_ORDER', 'CANCEL_ORDER',
        'PREPARE_SHIPPING', 'SHIPPED'
    )
  }, {
    classMethods: {
      associate: function(models) {
        Order.belongsToMany(models.Product, { through: models.OrderProduct })
        Order.belongsTo(models.Coupon)
      }
    }
  });
  return Order;
};
