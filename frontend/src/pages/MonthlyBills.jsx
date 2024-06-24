import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import LoadingSpinner from '../components/LoadingSpinner' ;

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const MonthlyBills = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve bill data from localStorage when the component mounts
    const storedBill = localStorage.getItem('bill');
    if (storedBill) {
      setBill(JSON.parse(storedBill));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/bills/studentbill",
        { month, year },
        { withCredentials: true }
      );
      setBill(res.data.data);
      // Save the fetched bill data to localStorage
      localStorage.setItem('bill', JSON.stringify(res.data.data));
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Failed to fetch bill. Please try again later.');
      }
      console.error("Error fetching bill:", error);
    } finally {
      setLoading(false);
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
        position: 'bottom',
        labels: {
          font: {
            size: 10,
          },
          boxWidth: 15,
        },
      },
      datalabels: {
        color: 'black',
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: Rs. ${value}`;
        },
        font: {
          weight: 'semibold',
          size: 16,
        },
        anchor: 'end',
        align: 'start',
        offset: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col xl:flex-row justify-center gap-8 items-center">
        <form onSubmit={handleSubmit} className="space-y-4 md:gap-6 md:space-y-0 md:flex md:items-center md:w-96">
          <div className="md:flex md:space-x-4 md:gap-2">
            <div className="flex-1">
              <label htmlFor="month" className="block text-gray-700 text-sm font-semibold mb-1">Enter month:</label>
              <input
                id="month"
                name="month"
                value={month}
                placeholder="Enter month..."
                type="number"
                className="text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="year" className="block text-gray-700 text-sm font-semibold mb-1">Enter year:</label>
              <input
                id="year"
                name="year"
                value={year}
                placeholder="Enter year..."
                type="number"
                className="text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs px-4 py-2 mt-4 md:mt-0 w-full md:w-auto"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Submit'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center md:text-left">
            {error}
          </div>
        )}

        {bill && !error && (
          <div className="flex-1 mt-6 p-6 bg-gray-50 rounded-lg border-blue-500 border-t-4 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Monthly Bills Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Detail</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Amount (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Total Bill</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{bill.totalbill}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Bill Per Day</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{bill.billPerDay}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Service Charge</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{bill.serviceCharge}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Extra Charge</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{bill.festivalcharges}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center items-center">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyBills;
