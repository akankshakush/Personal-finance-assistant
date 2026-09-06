const express = require('express');
const router = express.Router();

// Import only the needed controller functions
const { signupUser, loginUser } = require('../controllers/authController');

// Signup route
router.post('/signup', signupUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
