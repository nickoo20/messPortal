import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RiDeleteBin6Fill } from "react-icons/ri";
import LoadingSpinner from '../../components/LoadingSpinner';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    HostelName: '',
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
  });
  const [searchHostelName, setSearchHostelName] = useState(null);
  const [isAddExpenseFormVisible, setAddExpenseFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async (searchHostelName) => {
    setLoading(true);
    try {
      if (searchHostelName) {
        const res = await axios.post('http://localhost:8080/api/expense/single-hostel-expense', {
          searchHostelName
        });
        setExpenses(res.data.exp);
      } else {
        const res = await axios.get('http://localhost:8080/api/expense');
        setExpenses(res.data.exp);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch expenses');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/expense', newExpense);
      toast.success('Expense added successfully!');
      fetchExpenses();
      setNewExpense({
        HostelName: '',
        title: '',
        amount: '',
        category: '',
        description: '',
        date: '',
      });
      setAddExpenseFormVisible(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add expense');
    }
    setLoading(false);
  };

  const handleDeleteExpense = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/expense/delete-expense/${id}`);
      toast.success('Expense deleted successfully!');
      fetchExpenses();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete expense');
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExpenses(searchHostelName);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Manage Expenses</h2>
      
      <button
        onClick={() => setAddExpenseFormVisible(!isAddExpenseFormVisible)}
        className="bg-indigo-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-indigo-600 transition duration-300"
      >
        {isAddExpenseFormVisible ? 'Cancel' : 'Add Expense'}
      </button>
      
      {isAddExpenseFormVisible && (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mb-4">
          <form onSubmit={handleAddExpense} className="space-y-4">
            <select
              id="HostelName"
              value={newExpense.HostelName}
              onChange={(e) => setNewExpense({ ...newExpense, HostelName: e.target.value })}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="None">Enter Hostel Name</option>
              <option value="Girls Hostel">Girls Hostel</option>
              <option value="Jhelum Boys Hostel">Jhelum Boys Hostel</option>
              <option value="Manasbal Boys Hostel">Manasbal Boys Hostel</option>
              <option value="Mansar Boys Hostel">Mansar Boys Hostel</option>
              <option value="Chenab Boys Hostel">Chenab Boys Hostel</option>
            </select>
            <input
              type="text"
              placeholder="Title"
              value={newExpense.title}
              onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <textarea
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="2"
              required
            ></textarea>
            <input
              type="date"
              placeholder="Date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              Add Expense
            </button>
          </form>
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-md mb-4 w-full max-w-4xl">
        <form onSubmit={handleSearch} className="mb-4 flex items-center">
          <select
            id="searchHostelName"
            value={searchHostelName}
            onChange={(e) => setSearchHostelName(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="None">None</option>
            <option value="Girls Hostel">Girls Hostel</option>
            <option value="Jhelum Boys Hostel">Jhelum Boys Hostel</option>
            <option value="Manasbal Boys Hostel">Manasbal Boys Hostel</option>
            <option value="Mansar Boys Hostel">Mansar Boys Hostel</option>
            <option value="Chenab Boys Hostel">Chenab Boys Hostel</option>
          </select>
          <button
            type="submit"
            className="ml-2 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Search
          </button>
        </form>
        {loading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight text-gray-600">Title</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight text-gray-600">Hostel</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight text-gray-600">Amount</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight text-gray-600">Category</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight text-gray-600">Description</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight text-gray-600">Date</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td className="py-2 px-4 border-b border-gray-300">{expense.title}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{expense.HostelName}</td>
                  <td className="py-2 px-4 border-b border-gray-300">Rs. {expense.amount}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{expense.category}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{expense.description}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleDeleteExpense(expense._id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <RiDeleteBin6Fill size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseManager;
