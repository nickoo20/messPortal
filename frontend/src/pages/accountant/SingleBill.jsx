import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/userContext' ;
import Cookies from 'js-cookie';

import { jwtDecode } from "jwt-decode";

const StudentBill = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [billPerDay, setBillPerDay] = useState('');
  const [billData, setBillData] = useState(null);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useAuth();
  const handleFetchBill = async (e) => {
    e.preventDefault();
    setError(null);
    setBillData(null);
    
    try {
      const response = await axios.get(`http://localhost:8080/api/bills/${registrationNumber}`, {
        withCredentials:true,
        params: {
          month,
          year,
          billPerDay,
        },
      });
      //console.log(response.data.bill)
      setBillData(response.data);
    } catch (err) {
      setError('Failed to fetch bill data');
    }
  };
  if (!auth.user) {
    return (
      <>
        <h1>Please Login first!!</h1>
      </>
    );
  }
  const token=Cookies.get("access_token")
  const decoded=jwtDecode(token);
  const role=decoded.role;
  console.log(role);
  if (role!=='accountant'&&role !== 'student') {
    return <h1>You do not have permission to this page...</h1>;
  }
  return (
    <div>
      <h1>Calculate Student Bill</h1>
      <form onSubmit={handleFetchBill}>
        <div>
          <label>
            Registration Number:
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Month:
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Year:
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Bill Per Day:
            <input
              type="number"
              value={billPerDay}
              onChange={(e) => setBillPerDay(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Fetch Bill</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {billData && (
        <div>
          <h2>Bill Details</h2>
          {/* <p>Total Days Present: {billData.totalDaysPresent}</p> */}
          <p>Total Bill: {billData.bill}</p>
        </div>
      )}
    </div>
  );
};

export default StudentBill;
