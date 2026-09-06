const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Enable CORS middleware here in app.js
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const incomeRoutes = require('./routes/incomeRoutes');
app.use('/api/income', incomeRoutes);

const budgetRoutes = require('./routes/budgetRoutes');
app.use('/api/budget', budgetRoutes);

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expense', expenseRoutes);

const summaryRoutes = require('./routes/summaryRoutes');
app.use('/api/summary', summaryRoutes);

const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);

// Export the app
module.exports = app;
