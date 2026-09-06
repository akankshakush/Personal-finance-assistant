const db = require('../config/database');
const Income = require('../models/income');


// Add income
const addIncome = async (req, res) => {
  let { userId, amount, source, date, description } = req.body;

  if (!userId || !amount || !date) {
    return res.status(400).json({ message: 'userId, amount and date are required' });
  }

  date = new Date(date).toISOString().split('T')[0];

  try {
    await db.query(
      `INSERT INTO income 
       (userId, amount, source, date, description, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      {
        replacements: [userId, amount, source || null, date, description || null],
        type: db.QueryTypes.INSERT
      }
    );

    return res.status(201).json({ message: 'Income added successfully' });
  } catch (error) {
    console.error('Add income error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Fix was here: change from exports.getIncome to const getIncome
const getIncome = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const [results] = await db.query(
      `SELECT * FROM income WHERE userId = ? ORDER BY date DESC`,
      {
        replacements: [userId]
      }
    );

    res.json(results);
  } catch (error) {
    console.error("Get income error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Now this export will work perfectly
module.exports = {
  addIncome,
  getIncome
};
