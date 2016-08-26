'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    order_number: DataTypes.STRING // used by actors to search the order
  }, {
    classMethods: {
      associate: function(models) {
        Order.belongsToMany(models.Product, { through: models.OrderProduct })
      }
    }
  });
  return Order;
};
