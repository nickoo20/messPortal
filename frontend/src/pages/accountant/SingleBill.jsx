
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/userContext' ;
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";

const StudentBill = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [billData, setBillData] = useState(null);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useAuth();

  const handleFetchBill = async (e) => {
    e.preventDefault();
    setError(null);
    setBillData(null);

    try {
      const response = await axios.get(`http://localhost:8080/api/bills/${registrationNumber}`, {
        withCredentials: true,
        params: {
          month,
          year
        },
      });
      console.log(response.data);
      setBillData(response.data);
    } catch (err) {
      setError('Failed to fetch bill data');
    }
  };

  // if (!auth.user) {
  //   return (
  //     <h1 className="text-center text-xl mt-20">Please Login first!!</h1>
  //   );
  // }

  const token = Cookies.get("access_token");
  const decoded = jwtDecode(token);
  const role = decoded.role;
  console.log(role);

  if (role !== 'accountant' && role !== 'student') {
    return <h1 className="text-center text-xl mt-20">You do not have permission to this page...</h1>;
  }

  return (
    <div className="mt-20 p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Calculate Student Bill</h1>
      <form onSubmit={handleFetchBill} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Number:
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Month:
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year:
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </label>
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Fetch Bill
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {billData && (
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
            <tr className="bg-white hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{billData.studentId}</td>
              <td className="border border-gray-300 px-4 py-2">{billData.studentName}</td>
              <td className="border border-gray-300 px-4 py-2">Rs. {billData.totalbill}</td>
              <td className="border border-gray-300 px-4 py-2">Rs. {billData.serviceCharge}</td>
              <td className="border border-gray-300 px-4 py-2">{billData.festival}</td>
              <td className="border border-gray-300 px-4 py-2">Rs. {billData.festivalCharge}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentBill;

