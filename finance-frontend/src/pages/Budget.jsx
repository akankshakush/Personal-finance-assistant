import React, { useState } from 'react';
import axios from 'axios';

const Budget = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [message, setMessage] = useState('');

  const userId = 1; // replace with actual user ID later

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !month) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/budget/set-budget', {
        userId,
        category,
        amount: parseFloat(amount),
        month,
      });

      if (res.status === 200 || res.status === 201) {
        setMessage('Budget set successfully!');
        setAmount('');
        setCategory('');
        setMonth('');
      } else {
        setMessage('Failed to set budget');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error setting budget');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Set Budget</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount: </label><br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            required
          />
        </div>
        <div>
          <label>Category: </label><br />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. groceries, entertainment"
            required
          />
        </div>
        <div>
          <label>Month (YYYY-MM): </label><br />
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>
          Set Budget
        </button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default Budget;

