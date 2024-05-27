import { useState, useEffect } from 'react';

const MonthlyBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // Fetch bills data from API
    // setBills(response.data);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Monthly Bills</h2>
      <ul>
        {bills.map((bill) => (
          <li key={bill.id} className="mb-2 p-2 border rounded-lg">
            {bill.description}: ${bill.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyBills;
