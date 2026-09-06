import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expense = () => {
  const [userId, setUserId] = useState(1); // or get from auth context/session
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expense/');
      setExpenses(res.data);
    } catch {
      setError('Failed to fetch expenses.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/expense/add-expense', {
        userId,
        amount: Number(amount),
        category,
        date,
        description
      });
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');
      setError('');
      fetchExpenses();
    } catch {
      setError('Failed to add expense.');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {/* Description */}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add Expense
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-2">Expense History</h2>
      <ul className="divide-y">
        {expenses.map((exp) => (
          <li key={exp.id} className="py-2">
            ₹{exp.amount} - {exp.category} - {exp.date} - {exp.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
