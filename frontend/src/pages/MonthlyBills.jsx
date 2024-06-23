import axios from 'axios';
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const MonthlyBills = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [bill, setBill] = useState(null);

  useEffect(() => {
    // Retrieve bill data from localStorage when the component mounts
    const storedBill = localStorage.getItem('bill');
    if (storedBill) {
      setBill(JSON.parse(storedBill));
    }
  }, []);

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
      // Save the fetched bill data to localStorage
      localStorage.setItem('bill', JSON.stringify(res.data.data));
    } catch (error) {
      console.error("Error fetching bill:", error);
    }
  };

  const pieData = {
    labels: ['Total Bill', 'Bill Per Day', 'Service Charge', 'Extra Charge'],
    datasets: [
      {
        label: 'Amount in Rs.',
        data: bill
          ? [bill.totalbill, bill.billPerDay, bill.serviceCharge, bill.festivalcharges]
          : [0, 0, 0, 0],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels: {
        color: '#fff',
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: Rs. ${value}`;
        },
      },
    },
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className="flex my-10 justify-center ">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="">
            <label htmlFor="month" className="block text-gray-700 text-sm font-semibold mb-4">Enter month for which you want to fetch bill for:</label>
            <input
              id="month"
              name="month"
              value={month}
              placeholder="Enter month..."
              type="number"
              className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="year" className="block text-gray-700 text-sm font-semibold mb-4">Enter year for which you want to fecth bill for: </label>
            <input
              id="year"
              name="year"
              value={year}
              placeholder="Enter year..."
              type="number"
              className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <button type="submit" 
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                      focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs px-4 py-2 text-center me-2 mb-2">
            Submit
          </button>
        </form>

        {bill && (
          <div className="mt-6 p-6 mx-auto">
            <table className="w-full border-collapse border border-gray-300">
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
                <tr className="hover:bg-gray-100">
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
            <div className="mt-6 max-w-sm">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyBills;
