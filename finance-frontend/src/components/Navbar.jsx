// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center mb-6">
      <div className="text-xl font-bold text-blue-600">Finance Buddy</div>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/income" className="text-gray-700 hover:text-blue-600">Income</Link>
        <Link to="/expense" className="text-gray-700 hover:text-blue-600">Expenses</Link>
        <Link to="/budget" className="text-gray-700 hover:text-blue-600">Budget</Link>
        <Link to="/summary" className="text-gray-700 hover:text-blue-600">Summary</Link>
        <Link to="/chat" className="text-gray-700 hover:text-blue-600">AI Chat</Link>
        <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
