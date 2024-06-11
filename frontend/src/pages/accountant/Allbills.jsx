
import { useAuth } from "/Users/richashrivastava/finalyear/messPortal/frontend/src/context/userContext.jsx";
import React, { useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";

const Billcomp = () => {
  const [auth, setAuth] = useAuth();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);
  //const [extraCharge, setExtraCharge] = useState('');

  const fetchBills = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/bills`, {
        withCredentials: true,
        params: {
          month,
          year
          
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setBills(data.bills);
        setError(null);
      } else {
        setBills([]);
        setError(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setBills([]);
      setError('An error occurred. Please try again later.');
    }
  };

  if (!auth.user) {
    return <h1 className="text-center text-xl mt-20">Please Login first!!</h1>;
  }

  const token = Cookies.get("access_token");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  if (role !== "accountant") {
    return <h1 className="text-center text-xl mt-20">You do not have permission to this page...</h1>;
  }

  return (
    <div className="mt-20 p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Bill View</h1>
      <div className="mb-4">
        <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month:</label>
        <input 
          type="number" 
          id="month" 
          min="1" 
          max="12" 
          value={month} 
          onChange={(e) => setMonth(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year:</label>
        <input 
          type="number" 
          id="year" 
          min="1900" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required 
        />
      </div>
      
      <button 
        onClick={fetchBills} 
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Fetch Bills
      </button>
      {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      {bills.length > 0 && (
        <table className="mt-6 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Student ID</th>
              <th className="border border-gray-300 px-4 py-2">Student Name</th>
              <th className="border border-gray-300 px-4 py-2">Total Bill</th>
              <th className="border border-gray-300 px-4 py-2">Service Charge</th>
              <th className="border border-gray-300 px-4 py-2">Festival</th>
              <th className="border border-gray-300 px-4 py-2">Festival Charge</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{bill.studentId}</td>
                <td className="border border-gray-300 px-4 py-2">{bill.studentName}</td>
                <td className="border border-gray-300 px-4 py-2">Rs. {bill.totalbill}</td>
                <td className="border border-gray-300 px-4 py-2">Rs. {bill.serviceCharge}</td>
                <td className="border border-gray-300 px-4 py-2">{bill.festival}</td>
                <td className="border border-gray-300 px-4 py-2">Rs. {bill.festivalcharges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Billcomp;
