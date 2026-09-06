import React, { useState } from 'react';
import axios from 'axios';

function Income() {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // TODO: Replace with actual logged-in user ID
  const userId = 1;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!amount || !date || !userId) {
      setMessage('Please fill all required fields');
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setMessage('Amount must be a positive number');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/income', {
        userId,
        source,
        amount: parseFloat(amount),
        date,
        description,
      });

      if (res.status === 200) {
        setMessage('Income added successfully!');
        // Clear form
        setSource('');
        setAmount('');
        setDate('');
        setDescription('');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to add income. Try again later.');
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Income</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Source (optional)</label>
          <input
            type="text"
            value={source}
            onChange={e => setSource(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Salary, Freelance"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount ($) *</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Amount"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date *</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description (optional)</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Extra details"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Income
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
}

export default Income;
