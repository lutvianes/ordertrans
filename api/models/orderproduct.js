'use strict';
module.exports = function(sequelize, DataTypes) {
  var OrderProduct = sequelize.define('OrderProduct', {
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return OrderProduct;
};