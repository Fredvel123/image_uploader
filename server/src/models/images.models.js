const { DataTypes } = require('sequelize');
const sequelize = require('../database');
//
const imagesModel = sequelize.define('images', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  public_id: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
} ) 

module.exports = imagesModel;