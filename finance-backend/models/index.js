const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Income = require('./income');   // no (sequelize)
const Expense = require('./expense'); // no (sequelize)
const Budget = require('./budget');   // no (sequelize)

module.exports = {
  sequelize,
  Sequelize,
  Income,
  Expense,
  Budget
};

