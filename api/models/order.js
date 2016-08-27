'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    order_number: DataTypes.STRING, // used by actors to search the order
    status: {
        type: DataTypes.ENUM(
            'submitted', 'validated', 'cancelled', 'shipped', 'completed'
        ),
        allowNull: true
    },
    coupon_status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Order.belongsToMany(models.Product, { through: models.OrderProduct })
        Order.belongsTo(models.Customer)
        Order.belongsTo(models.Coupon)
      }
    }
  });
  return Order;
};
