import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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

  const fetchExpenses = async (searchHostelName) => {
    try {
        if(searchHostelName){
      const res = await axios.post('http://localhost:8080/api/expense/single-hostel-expense', {
        searchHostelName
      });
      setExpenses(res.data.exp);
    }
    else{
        const res=await axios.get('http://localhost:8080/api/expense')
        console.log(res);
        setExpenses(res.data.exp);
    }
      
    
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch expenses');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
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
    } catch (error) {
      console.error(error);
      toast.error('Failed to add expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/expense/delete-expense/${id}`);
      toast.success('Expense deleted successfully!');
      fetchExpenses();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete expense');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExpenses(searchHostelName);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Manage Expenses</h2>
        <form onSubmit={handleAddExpense} className="space-y-4">
          {/* <input
            type="text"
            placeholder="Hostel Name"
            value={newExpense.HostelName}
            onChange={(e) => setNewExpense({ ...newExpense, HostelName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          /> */}
          <select
              id="HostelName"
              value={newExpense.HostelName}
              onChange={(e) => setNewExpense({ ...newExpense, HostelName: e.target.value })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <textarea
            placeholder="Description"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="2"
            required
          ></textarea>
          <input
            type="date"
            placeholder="Date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Expense
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mb-4">
        <form onSubmit={handleSearch} className="mb-4 flex">
          {/* <input
            type="text"
            placeholder="Search by Hostel Name"
            value={searchHostelName}
            onChange={(e) => setSearchHostelName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          /> */}
          <select
              id="searchHostelName"
              value={searchHostelName}
              onChange={(e) => setSearchHostelName(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </form>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense._id} className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{expense.title}</h3>
                <p className="text-sm">Hostel: {expense.HostelName}</p>
                <p className="text-sm">Amount: ${expense.amount}</p>
                <p className="text-sm">Category: {expense.category}</p>
                <p className="text-sm">Description: {expense.description}</p>
                <p className="text-sm">Date: {new Date(expense.date).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleDeleteExpense(expense._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseManager;
