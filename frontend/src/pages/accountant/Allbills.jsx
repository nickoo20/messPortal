import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/userContext';
import { useSelector, useDispatch } from 'react-redux';
import { setBills } from '../../redux/bill/billSlice';
import { IoMdDownload } from 'react-icons/io';

const Billcomp = () => {
  const [auth, setAuth] = useAuth();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);
  const [HostelName, setHostel] = useState('');
  const dispatch = useDispatch();
  const { bills } = useSelector(state => state.bill);

  const fetchBills = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/bills`, {
        withCredentials: true,
        params: { month, year, HostelName },
      });
      const data = response.data;
      if (response.status === 200) {
        console.log(data.bills);
        dispatch(setBills(data.bills));
        setError(null);
      } else {
        dispatch(setBills([]));
        setError(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      dispatch(setBills([]));
      setError('An error occurred. Please try again later.');
    }
  };
  const formatRegistrationNumber = (registrationNumber) => {
    const registrationStr = registrationNumber.toString();
    if (registrationStr.length > 4) {
      return registrationStr.slice(0, 4) + 'NITSGR' + registrationStr.slice(4);
    }
    return registrationStr;
  };

  const downloadCSV = () => {
    const headers = ['Student ID', 'Student Name', 'Total Bill', 'Service Charge', 'Festival', 'Festival Charge'];
    const csvRows = [];
    csvRows.push(headers.join(','));

    bills.forEach(bill => {
      const row = [
        formatRegistrationNumber(bill.registrationNumber),
        bill.studentName,
        bill.totalbill,
        bill.serviceCharge,
        bill.festival,
        bill.festivalcharges
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bills_${month}_${year}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <h1 className="text-3xl text-blue-700 my-4 font-bold font-jakarta text-center">Admin Bill View</h1>
      <div className='flex flex-col items-center justify-center gap-6'>
        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg border shadow-md">
          <div>
            <label htmlFor="month" className="block text-sm mb-2 font-medium text-gray-700">Enter month:</label>
            <input
              type="number"
              id="month"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm mb-2 font-medium text-gray-700">Enter year:</label>
            <input
              type="number"
              id="year"
              min="1900"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="HostelName" className="block text-sm mb-2 font-medium text-gray-700">Choose Hostel:</label>
            <select
              id="HostelName"
              value={HostelName}
              onChange={(e) => setHostel(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
            >
              <option value="None">Select Hostel Name</option>
              <option value="Girls Hostel">Girls Hostel</option>
              <option value="Jhelum Boys Hostel">Jhelum Boys Hostel</option>
              <option value="Manasbal Boys Hostel">Manasbal Boys Hostel</option>
              <option value="Mansar Boys Hostel">Mansar Boys Hostel</option>
              <option value="Chenab Boys Hostel">Chenab Boys Hostel</option>
            </select>
          </div>
          <button
            onClick={fetchBills}
            className="bg-blue-500 text-sm text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Fetch Bills
          </button>
        </div>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {bills?.length > 0 && (
          <div className='bg-white p-6 rounded-lg border shadow-md w-full max-w-5xl'>
            <div className='flex justify-end mb-4'>
              <button
                onClick={downloadCSV}
                className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
              >
                <IoMdDownload className="mr-2" size={18} /> Download CSV
              </button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Registration Number</th>
                  <th className="border border-gray-300 px-4 py-2">Student Name</th>
                  <th className="border border-gray-300 px-4 py-2">Total Bill</th>
                  <th className="border border-gray-300 px-4 py-2">Bill Per Day</th>
                  <th className="border border-gray-300 px-4 py-2">Service Charge</th>
                  <th className="border border-gray-300 px-4 py-2">Extra Charge For</th>
                  <th className="border border-gray-300 px-4 py-2">Extra Charge</th>
                </tr>
              </thead>
              <tbody>
                {bills?.map((bill, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{formatRegistrationNumber(bill.registrationNumber)}</td>
                    <td className="border border-gray-300 px-4 py-2">{bill.studentName}</td>
                    <td className="border border-gray-300 px-4 py-2">Rs. {bill.totalbill}</td>
                    <td className="border border-gray-300 px-4 py-2">Rs. {bill.billPerDay}</td>
                    <td className="border border-gray-300 px-4 py-2">Rs. {bill.serviceCharge}</td>
                    <td className="border border-gray-300 px-4 py-2">{bill.festival}</td>
                    <td className="border border-gray-300 px-4 py-2">Rs. {bill.festivalcharges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billcomp;
