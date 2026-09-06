const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Income = sequelize.define('Income', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  source: DataTypes.STRING,
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: DataTypes.STRING,
}, {
  tableName: 'income',
  timestamps: true,
});

module.exports = Income;
