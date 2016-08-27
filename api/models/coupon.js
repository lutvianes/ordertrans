'use strict';
module.exports = function(sequelize, DataTypes) {
  var Coupon = sequelize.define('Coupon', {
    code: DataTypes.STRING,
    valid_date_start: DataTypes.DATE,
    valid_date_end: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    discount_percentage: DataTypes.FLOAT,
    discount_nominal: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Coupon;
};