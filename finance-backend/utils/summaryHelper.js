const { Op } = require('sequelize');
const Income = require('../models/income');
const Expense = require('../models/expense');
const Budget = require('../models/budget');

const getFinancialData = async (userId, month) => {
  const startDate = new Date(`${month}-01`);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

  const [income, expenses, budget] = await Promise.all([
    Income.sum('amount', {
      where: {
        userId,
        date: { [Op.between]: [startDate, endDate] }
      }
    }),
    Expense.findAll({
      where: {
        userId,
        date: { [Op.between]: [startDate, endDate] }
      }
    }),
    Budget.findOne({
      where: {
        userId,
        month
      }
    })
  ]);

  // Group expenses by category and sum amounts
  const expenseByCategory = {};
  expenses.forEach(e => {
    const cat = e.category || 'Uncategorized';
    expenseByCategory[cat] = (expenseByCategory[cat] || 0) + e.amount;
  });

  // Assume budget.categories is stored as JSON string or JS object
  // If stored as JSON string, parse it
  let budgetCategories = [];
  if (budget && budget.categories) {
    if (typeof budget.categories === 'string') {
      try {
        budgetCategories = JSON.parse(budget.categories);
      } catch {
        budgetCategories = [];
      }
    } else {
      budgetCategories = budget.categories;
    }
  }

  // Build comparison array
  const comparison = budgetCategories.map(bcat => ({
    category: bcat.category,
    budget: bcat.amount,
    expense: expenseByCategory[bcat.category] || 0,
  }));

  return {
    totalIncome: income || 0,
    totalExpense: expenses.reduce((sum, e) => sum + e.amount, 0),
    comparison,
  };
};

module.exports = { getFinancialData };
