import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const sampleData = [
  { month: 'Jan', income: 10000, expenses: 4000 },
  { month: 'Feb', income: 12000, expenses: 6000 },
  { month: 'Mar', income: 8000, expenses: 5000 },
  { month: 'Apr', income: 15000, expenses: 7000 },
  { month: 'May', income: 13000, expenses: 4000 },
];

const recentTransactions = [
  { id: 1, type: 'income', description: 'Salary', amount: 10000, date: '2025-05-01' },
  { id: 2, type: 'expense', description: 'Groceries', amount: 1500, date: '2025-05-02' },
  { id: 3, type: 'expense', description: 'Electricity Bill', amount: 1200, date: '2025-05-03' },
  { id: 4, type: 'income', description: 'Freelance', amount: 3000, date: '2025-05-04' },
  { id: 5, type: 'expense', description: 'Internet', amount: 800, date: '2025-05-05' },
];

function Dashboard() {
  const totalIncome = sampleData.reduce((acc, cur) => acc + cur.income, 0);
  const totalExpenses = sampleData.reduce((acc, cur) => acc + cur.expenses, 0);
  const savings = totalIncome - totalExpenses;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 text-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Total Income</h2>
          <p className="text-3xl font-bold">₹{totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-red-600 text-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
          <p className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-green-600 text-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Savings</h2>
          <p className="text-3xl font-bold">₹{savings.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Monthly Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#2563EB" name="Income" />
            <Bar dataKey="expenses" fill="#DC2626" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recent Transactions</h2>
        <ul className="divide-y divide-gray-200">
          {recentTransactions.map((txn) => (
            <li key={txn.id} className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium">{txn.description}</p>
                <p className="text-sm text-gray-500">{new Date(txn.date).toLocaleDateString()}</p>
              </div>
              <p className={`font-semibold ${
                txn.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {txn.type === 'income' ? '+' : '-'}₹{txn.amount.toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

