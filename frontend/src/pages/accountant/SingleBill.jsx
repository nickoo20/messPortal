import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBillData } from '../../redux/bill/billSlice';
import { Pie } from 'react-chartjs-2';
import { FaInfoCircle } from "react-icons/fa";
import 'chart.js/auto';
import toast from 'react-hot-toast';

const StudentBill = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.admin);
  const { billData } = useSelector((state) => state.bill);
  const dispatch = useDispatch();

  const handleFetchBill = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/api/bills/${registrationNumber}`, {
        withCredentials: true,
        params: { month, year },
      });
      dispatch(setBillData(response.data.existing));
      toast.success('Bill data fetched successfully');
    } catch (err) {
      setError('Failed to fetch bill data');
      toast.error('Failed to fetch bill data');
    }
  };

  if (!user) {
    return <h1 className="text-center text-xl mt-20">Please Login first!!</h1>;
  }

  if (user.role !== 'accountant' && user.role !== 'warden') {
    return <h1 className="text-center text-xl mt-20">You do not have permission to this page...</h1>;
  }

  const chartData = billData
    ? {
        labels: ['Total Bill', 'Bill Per Day', 'Service Charge', 'Festival Charge'],
        datasets: [
          {
            label: 'Amount (Rs.)',
            data: [billData.totalbill, billData.billPerDay, billData.serviceCharge, billData.festivalcharges],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div className='min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12'>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Calculate Student Bill</h1>
            <form onSubmit={handleFetchBill} className="space-y-4">
              <div>
                <label
                  htmlFor="registrationNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration Number in format: <span className="text-blue-700 font-medium">20200832</span> from <span className="text-blue-700 font-medium"> 2020</span>-NITSGR-<span className="text-blue-700 font-medium">0832</span>
                </label>
                <div className="relative flex items-center w-full group mt-2">
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  <div className="ml-2 flex items-center">
                    <FaInfoCircle className="text-gray-500 cursor-pointer" />
                    <div className="absolute bottom-8 left-0 w-64 p-2 bg-white border border-gray-300 rounded-md shadow-md text-xs text-gray-700 hidden group-hover:flex flex-col">
                      <div>(e.g., Write in format <span className="text-green-700">20200832</span> from <span className="text-green-700">2020</span>NITSGR<span className="text-green-700">0832</span>)</div>
                    </div>
                  </div>
                </div>
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
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Get Bill
              </button>
            </form>

            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

            {billData && (
              <div className="mt-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 mb-6">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Student ID</th>
                        <th className="border border-gray-300 px-4 py-2">Student Name</th>
                        <th className="border border-gray-300 px-4 py-2">Total Bill</th>
                        <th className="border border-gray-300 px-4 py-2">Bill Per Day</th>
                        <th className="border border-gray-300 px-4 py-2">Service Charge</th>
                        <th className="border border-gray-300 px-4 py-2">Extra Charge For</th>
                        <th className="border border-gray-300 px-4 py-2">Extra Charge</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{billData.registrationNumber}</td>
                        <td className="border border-gray-300 px-4 py-2">{billData.studentName}</td>
                        <td className="border border-gray-300 px-4 py-2">Rs. {billData.totalbill}</td>
                        <td className="border border-gray-300 px-4 py-2">Rs. {billData.billPerDay}</td>
                        <td className="border border-gray-300 px-4 py-2">Rs. {billData.serviceCharge}</td>
                        <td className="border border-gray-300 px-4 py-2">{billData.festival}</td>
                        <td className="border border-gray-300 px-4 py-2">Rs. {billData.festivalcharges}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="w-full max-w-lg mx-auto">
                  {chartData && <Pie data={chartData} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBill;
