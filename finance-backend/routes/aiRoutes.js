const express = require('express');
const router = express.Router();
const { generateGeminiResponse } = require('../controllers/geminiController');
const authenticateUser = require('../middleware/authenticateUser'); // ✅ import here

router.post('/chat', authenticateUser, generateGeminiResponse); // ✅ protect this route

module.exports = router;




