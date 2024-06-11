import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/userContext";
const MarkLeave = () => {
  const initialData = {
    registrationNumber: 0,
    startDate: "",
    endDate: "",
  };
  const [inputData, setInputData] = useState(initialData);
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
      });

      console.log(response);
      if (response?.status===200) {
        toast.success(response.data.message) ;
        // Navigate to login page or show a success message
        
        // navigate("/login-student");
      }
      console.log("sent");
    } catch (error) {
      //setMessage(error.response.);
      toast.error(error.message)
      console.log("error in axios")
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
    <div className='min-h-screen bg-gray-100'>
      <h1 className="text-3xl text-center text-purple-800 font-inter font-bold mb-6 p-4">Mark Student Leave</h1>
    <div className="flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md border-r-4 border-l-4 w-full max-w-xl ">
        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
          <div className='flex justify-center items-center'>
            <button type="submit" className="py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm focus:outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default MarkLeave;
