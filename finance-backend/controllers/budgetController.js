const Budget = require('../models/budget');

exports.setBudget = async (req, res) => {
  const { userId, category, amount, month } = req.body;

  if (!userId || !category || !amount || !month) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [budget, created] = await Budget.findOrCreate({
      where: { userId, category, month },
      defaults: { amount }
    });

    if (!created) {
      budget.amount = amount;
      await budget.save();
    }

    res.status(200).json({ message: 'Budget set successfully', budget });
  } catch (error) {
    console.error('Set budget error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Fetch budgets by user, optional filters: month, category
exports.getBudget = async (req, res) => {
  const { userId, month, category } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const whereClause = { userId };

    if (month) whereClause.month = month;
    if (category) whereClause.category = category;

    const budgets = await Budget.findAll({ where: whereClause });

    res.json(budgets);
  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

