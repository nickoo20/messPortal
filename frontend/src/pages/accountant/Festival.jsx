import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
//import e from 'express';

const FestCharge=()=>{
    const [charge,setCharge]=useState(0);
    const [registrationNumber,setregnum]=useState(0);
    const [month,setmonth]=useState('');
    const [year,setyear]=useState('');
    const [festival,setFestival]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            console.log(month);
            console.log(year);
            //console.log(billPerDay);
        const res=await axios.post("http://localhost:8080/api/bills/check-fest",{
            month,
            year,
            charge,
            registrationNumber,
            festival
        },{
            withCredentials:true
        });
        console.log(res);
        if (res.data.exists) {
            if (window.confirm('This entry already exists. Do you want to replace it?')) {
              await axios.post('http://localhost:8080/api/bills/update-fest', { month,year,charge,registrationNumber ,festival},{
                withCredentials:true
              });
              toast.success('Entry replaced successfully.');
            } else {
              toast.success('Entry was not replaced.');
            }
          } else {
              
            toast.success('Entry created successfully.');
          }
        // console.log(res);
        // if(res.status===201)
        // toast.success("Bill Per Day Updated successfully!");
    }
    catch(error){
        const msg = error.response?.data?.message || "An error occurred";
        toast.error(msg);
    }

    }
    return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Set Festival Charges</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        placeholder="Month (MM)"
                        value={month}
                        name='month'
                        onChange={(e) => setmonth(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    
                    <input
                        type="number"
                        placeholder="Year (YYYY)"
                        value={year}
                        name='year'
                        onChange={(e) => setyear(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <label htmlFor='Charge'> Enter Charge</label>
                    <input
                        type="number"
                        placeholder="Charge"
                        value={charge}
                        name='Charge'
                        onChange={(e) => setCharge(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <label htmlFor='registrationNumber'> Enter registrationNumber</label>
                    <input
                        type="number"
                        placeholder="Registration-Number"
                        value={registrationNumber}
                        name='registrationNumber'
                        onChange={(e) => setregnum(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Occasion"
                        value={festival}
                        name='festival'
                        onChange={(e) => setFestival(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        //onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
                
            </div>
        </div>
    )

};
export default FestCharge;