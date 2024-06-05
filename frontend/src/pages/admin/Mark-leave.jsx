import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/userContext" ;
const MarkLeave = () => {
  
  const data={registrationNumber:0,
     startDate:"",
     endDate:"",
     //leaveDays:0
};
  const [inputdata,setinputdata]=useState(data)
  const [auth, setAuth] = useAuth();
  const handledata=(e)=>{
      setinputdata({...inputdata,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(inputdata)
      const response = await axios.post('http://localhost:8080/api/mark-leave', inputdata,{
        
        
        // headers: {
        //   'Accept': 'application/json'
        //   //'User-Agent': 'Your User Agent String' // Replace with your user agent string
        // },
        withCredentials:true,
        credentials: 'include',
      

      });
      
      console.log(response);
      console.log("sent");
    } catch (error) {
      //setMessage(error.response.);
      console.log("error in axios")
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
  if (role!== "warden") {
    return <h1>You do not have permission to this page...</h1>;
  }
  return (
    <div className="container">
      <h1>Mark Leave</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="registrationNumber">Student ID</label>
          <input
            type="number"
            className="form-control"
            id="registrationNumber"
            name="registrationNumber"
            value={inputdata.registrationNumber}
            onChange={handledata}
          />
        </div>
        <div>
            <div className='form-group'>
                <label htmlFor="startDate">Start date</label>
                <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={inputdata.startDate}
                onChange={handledata}
                />

            </div>
            <div className='form-group'>
                <label htmlFor="endDate">End date</label>
                <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={inputdata.endDate}
                onChange={handledata}
                />

            </div>
        </div>
        {/* <div className="form-group">
          <label htmlFor="leaveDays">Number of Leave Days</label>
          <input
            type="number"
            className="form-control"
            id="leaveDays"
            value={inputdata.leaveDays}
            name="leaveDays"
            onChange={handledata}
          />
        </div> */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* {message && <p className="mt-3">{message}</p>} */}
    </div>
  );
};

export default MarkLeave;