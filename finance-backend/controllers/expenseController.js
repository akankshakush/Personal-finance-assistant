const Expense = require('../models/expense');

// Add expense
exports.addExpense = async (req, res) => {
  const { userId, amount, category, date, description } = req.body;

  if (!userId || !amount || !date) {
    return res.status(400).json({ message: 'userId, amount, and date are required' });
  }

  try {
    const newExpense = await Expense.create({
      userId,
      amount,
      category: category || null,
      date,
      description: description || null,
    });
    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all expenses for a user
exports.getExpenses = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const expenses = await Expense.findAll({
      where: { userId },
      order: [['date', 'DESC']],
    });
    res.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
