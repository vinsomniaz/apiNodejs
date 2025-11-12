const { DataTypes } = require('sequelize');

const ProductModel = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING, defaultValue: 'hot drink' },
  isNew: { type: DataTypes.BOOLEAN, defaultValue: false }
};

module.exports = (sequelize) => sequelize.define('product', ProductModel);
