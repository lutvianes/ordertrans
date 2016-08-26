'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    product_number: DataTypes.STRING, // used by actors to search the product
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Product.belongsToMany(models.Order, { through: models.OrderProduct })
      }
    }
  });
  return Product;
};
