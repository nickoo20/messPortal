//import React from "react";
import { useAuth } from "/Users/richashrivastava/finalyear/messPortal/frontend/src/context/userContext.jsx";
import React, { useState } from 'react';
import axios from "axios";
const Billcomp=()=>{
    const [auth, setAuth] = useAuth();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);
  const [billPerDay, setBillPerDay] = useState('');
  const fetchBills = async () => {
    
    try {
      const response = await axios.get(`http://localhost:8080/api/bills`,{
        params: {
            month,
            year,
            billPerDay,
          },
      });
      const data =  response.data;

      console.log(response)
      //const data = response.data;
      console.log(response.ok);
      if (response.status===200) {
        setBills(data.bills);
        setError(null);
      } else {
        setBills([]);
        setError(data.error);
      }
      console.log(bills)
    } catch (error) {
      console.error('Error:', error);
      setBills([]);
      setError('An error occurred. Please try again later.');
    }
  };
  if (!auth.user) {
    return (
      <>
        <h1>Please Login first!!</h1>
      </>
    );
  }
  if (auth?.user?.role !== 3) {
    return <h1>You do not have permission to this page...</h1>;
  }
return(
    <>
    <div className="mt-20">
           
           <h1>Admin Bill View</h1>
           <div>
             <label htmlFor="month">Month:</label>
             <input type="number" id="month" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} required />
           </div>
           <div>
             <label htmlFor="year">Year:</label>
             <input type="number" id="year" min="1900" value={year} onChange={(e) => setYear(e.target.value)} required />
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
           <button onClick={fetchBills}>Fetch Bills</button>
           {error && <div className="error">{error}</div>}
           {bills.length > 0 && (
             <table>
               <thead>
                 <tr>
                   <th>Student ID</th>
                   <th>Student Name</th>
                   <th>Total Bill</th>
                 </tr>
               </thead>
               <tbody>
                 {bills.map((bill, index) => (
                   <tr key={index}>
                     <td>{bill.studentId}</td>
                     <td>{bill.studentName}</td>
                     <td>Rs. {bill.totalBill.toFixed(2)}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           )}
         </div>
    </>
)
}
export default Billcomp;