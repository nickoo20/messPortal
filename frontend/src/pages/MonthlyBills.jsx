
import axios from 'axios';
import { useState } from 'react';

const MonthlyBills = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [bill, setBill] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/bills/studentbill",
        { month, year },
        { withCredentials: true }
      );
      console.log(res);
      setBill(res.data.data);
    } catch (error) {
      console.error("Error fetching bill:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="month" className="block text-gray-700 text-sm font-bold mb-2">Month</label>
          <input
            id="month"
            name="month"
            value={month}
            placeholder="Enter month"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Year</label>
          <input
            id="year"
            name="year"
            value={year}
            placeholder="Enter year"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Fetch
        </button>
      </form>

      {bill && (
        <div className="mt-6 bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Student ID</th>
                <th className="border border-gray-300 px-4 py-2">Student Name</th>
                <th className="border border-gray-300 px-4 py-2">Total Bill</th>
                <th className="border border-gray-300 px-4 py-2">Bill Per Day</th>
                <th className="border border-gray-300 px-4 py-2">Service Charge</th>
                <th className="border border-gray-300 px-4 py-2">Exta Charge For</th>
                <th className="border border-gray-300 px-4 py-2">Extra Charge</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{bill.registrationNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{bill.studentName}</td>
                <td className="border border-gray-300 px-4 py-2">Rs. {bill.totalbill}</td>
                <td className="border border-gray-300 px-4 py-2">Rs. {bill.billPerDay}</td>
                <td className="border border-gray-300 px-4 py-2">Rs. {bill.serviceCharge}</td>
                <td className="border border-gray-300 px-4 py-2">{bill.festival}</td>
                <td className="border border-gray-300 px-4 py-2">Rs. {bill.festivalcharges}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MonthlyBills;
