const express = require('express');
const router = express.Router();
const { addIncome, getIncome } = require('../controllers/incomeController');

// Route to get all income for a user
router.get('/', getIncome);

// Route to add income
router.post('/', addIncome);

module.exports = router;


