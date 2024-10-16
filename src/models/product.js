const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('product', {
   id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   },
   name: {
     type: DataTypes.STRING,
     allowNull: false
   },
   description: {
      type: DataTypes.TEXT,
   },
   createdDate: {
     type: DataTypes.DATEONLY,
   },
   price: {
      type: DataTypes.DECIMAL(10, 2),
     allowNull: false,
   },
   productViewed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isDeleted: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
});
module.exports = { Product, sequelize };
