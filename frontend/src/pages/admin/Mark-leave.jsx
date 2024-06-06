import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/userContext";
import { useSelector } from 'react-redux';

const MarkLeave = () => {
  const initialData = {
    registrationNumber: 0,
    startDate: "",
    endDate: "",
  };

  const [inputData, setInputData] = useState(initialData);
  const { auth, setAuth } = useAuth();
  const { user } = useSelector(state => state.admin);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inputData);
      const response = await axios.post('http://localhost:8080/api/mark-leave', inputData, {
        withCredentials: true,
        credentials: 'include',
      });

      console.log(response);
      setMessage({
        text: "Leave marked successfully. The leave has been recorded.",
        type: "success"
      });
    } catch (error) {
      console.log("Error in axios", error);
      setMessage({
        text: "There was an error marking the leave.",
        type: "error"
      });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please Login first!!</h1>
        </div>
      </div>
    );
  }

  if (user.role !== "warden") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You do not have permission to access this page...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md -mt-40">
        <h1 className="text-2xl font-bold mb-6">Mark Leave</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div className={`p-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message.text}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="registrationNumber" className="text-sm font-medium text-gray-700 flex gap-2">Registration No.(e.g)
          <div className='text-sm'><span className='text-green-600'>2020</span>NITSGR<span className='text-green-600'>0832</span></div>
            as <span className='text-green-600'> (20200832)</span> 
            </label>
            <input
              type="number"
              name="registrationNumber"
              value={inputData.registrationNumber}
              onChange={handleChange}
              placeholder="Enter Student ID"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={inputData.startDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={inputData.endDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarkLeave;
