'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING, // used by actors to search the product
    price: DataTypes.INTEGER,
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
