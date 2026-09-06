const express = require('express');
const router = express.Router();
const { getFinancialSummary } = require('../controllers/summaryController');

router.get('/', getFinancialSummary);

module.exports = router;
