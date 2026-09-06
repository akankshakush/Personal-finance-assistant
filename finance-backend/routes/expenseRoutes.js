const express = require('express');
const router = express.Router();
const { addExpense, getExpenses } = require('../controllers/expenseController');

router.post('/add-expense', addExpense); // ✅ THIS IS NEEDED
router.get('/', getExpenses);

module.exports = router;
