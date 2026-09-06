const Income = require('../models/income');
const Expense = require('../models/expense');
const Budget = require('../models/budget');
const { Op, fn, col } = require('sequelize'); // ✅ Import fn and col

exports.getFinancialSummary = async (req, res) => {
  const { userId, month } = req.query;

  if (!userId || !month) {
    return res.status(400).json({ message: 'userId and month are required' });
  }

  try {
    // Prepare date range for the month
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    // Total Income in the month
    const totalIncome = await Income.sum('amount', {
      where: {
        userId,
        date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        }
      }
    });

    // Total Expense in the month
    const totalExpense = await Expense.sum('amount', {
      where: {
        userId,
        date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        }
      }
    });

    // Budgets for the month
    const budgets = await Budget.findAll({
      where: { userId, month },
      attributes: ['category', 'amount']
    });

    // Expenses by category
    const expensesByCategory = await Expense.findAll({
      where: {
        userId,
        date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        }
      },
      attributes: ['category', [fn('SUM', col('amount')), 'total']], // ✅ Use fn and col
      group: ['category']
    });

    // Prepare comparison data
    const budgetMap = {};
    budgets.forEach(b => {
      budgetMap[b.category] = b.amount;
    });

    const expenseMap = {};
    expensesByCategory.forEach(e => {
      expenseMap[e.category] = parseFloat(e.get('total'));
    });

    // Combine for comparison
    const comparison = Object.keys(budgetMap).map(cat => ({
      category: cat,
      budget: budgetMap[cat],
      expense: expenseMap[cat] || 0,
      difference: budgetMap[cat] - (expenseMap[cat] || 0)
    }));

    res.json({
      totalIncome: totalIncome || 0,
      totalExpense: totalExpense || 0,
      budgets,
      expensesByCategory: expenseMap,
      comparison
    });

  } catch (error) {
    console.error('Financial summary error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
