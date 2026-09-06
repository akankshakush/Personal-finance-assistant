const { Income, Expense, Budget } = require('../models');

async function fetchUserFinancialData(userId) {
  const income = await Income.findAll({ where: { userId } });
  const expenses = await Expense.findAll({ where: { userId } });
  const budget = await Budget.findAll({ where: { userId } });

  return {
    income,
    expenses,
    budget
  };
}

module.exports = fetchUserFinancialData;
