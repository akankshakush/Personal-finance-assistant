// In your main application file (e.g., app.js or index.js)
require('dotenv').config(); // Ensure this is at the very top

// In your generateGeminiResponse.js file:
const axios = require('axios');
const fetchUserFinancialData = require('../helpers/userDataFetcher'); // ✅ Import the helper
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const generateGeminiResponse = async (req, res) => {
  if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error: API key missing.' });
  }

  const userInput = req.body.message;

  try {
    const userId = req.user.id; // ✅ Assuming user is authenticated and `req.user` is set
    const userData = await fetchUserFinancialData(userId);

    // ✅ Prepare a readable summary of user's financial data
   const incomeTotal = userData.income.reduce((sum, i) => sum + parseFloat(i.amount), 0);
const expenseTotal = userData.expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

    const budgetBreakdown = userData.budget.map(b => `${b.category}: ${b.amount}`).join(', ');

    const summary = `
User's Financial Summary:
- Total Income: ₹${incomeTotal}
- Total Expenses: ₹${expenseTotal}
- Budget: ${budgetBreakdown || 'No budget data available'}
`;

    // ✅ Construct the final prompt for Gemini
    const finalPrompt = `
You are a helpful AI financial assistant. Use the following personal financial data to provide smart, actionable advice.

${summary}

User's Question: ${userInput}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: finalPrompt }] }]
      }
    );

    const geminiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ reply: geminiReply || 'No response from Gemini.' });

  } catch (error) {
    console.error('Gemini API request failed:', error.response?.data || error.message);
    const apiErrorMessage = error.response?.data?.error?.message || 'Unknown error from Gemini API.';
    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({ error: `Failed to get response from Gemini API: ${apiErrorMessage}` });
  }
};

module.exports = { generateGeminiResponse };
