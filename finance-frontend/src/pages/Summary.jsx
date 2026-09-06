import React, { useState } from 'react';
import axios from 'axios';

const Summary = () => {
  const [month, setMonth] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userId = 3; // replace with logged-in user ID later

  const handleFetchSummary = async () => {
    if (!month) {
      setError('Please select a month');
      return;
    }

    setLoading(true);
    setError('');
    setSummary(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/summary`, {
        params: { userId, month },
      });

      setSummary(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Monthly Summary</h2>
      <div>
        <label>Month (YYYY-MM): </label><br />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={handleFetchSummary} style={{ marginLeft: '10px' }}>
          Get Summary
        </button>
      </div>

      {loading && <p>Loading summary...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && (
        <div style={{ marginTop: '20px' }}>
          <h3>Summary for {month}</h3>
          {/* Assuming summary has income, expense, budget, etc. Adjust based on your API response */}
          <p><strong>Total Income:</strong> {summary.totalIncome ?? 'N/A'}</p>
          <p><strong>Total Expense:</strong> {summary.totalExpense ?? 'N/A'}</p>
          <p><strong>Budget Set:</strong> {summary.budgetSet ?? 'N/A'}</p>
          {/* You can add more fields or a table based on the actual data */}
          <pre>{JSON.stringify(summary, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Summary;
