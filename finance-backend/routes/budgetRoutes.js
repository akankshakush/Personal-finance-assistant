const express = require('express');
const router = express.Router();
const { setBudget, getBudget } = require('../controllers/budgetController');


router.post('/set-budget', setBudget);
router.get('/get-budget', getBudget);


module.exports = router;
