import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa";

const FestCharge = () => {
  const [charge, setCharge] = useState(0);
  const [registrationNumber, setRegistrationNumber] = useState(0);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [festival, setFestival] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(month);
      console.log(year);
      //console.log(billPerDay);
      const res = await axios.post("http://localhost:8080/api/bills/check-fest", {
        month,
        year,
        charge,
        registrationNumber,
        festival
      }, {
        withCredentials: true
      });
      console.log(res);
      if (res.data.exists) {
        if (window.confirm('This entry already exists. Do you want to replace it?')) {
          await axios.post('http://localhost:8080/api/bills/update-fest', { month, year, charge, registrationNumber, festival }, {
            withCredentials: true
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
    catch (error) {
      const msg = error.response?.data?.message || "An error occurred";
      toast.error(msg);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-r-4 border-blue-500">
        <h1 className="text-2xl font-bold mb-6 text-center font-jakarta">Set Festival Charges</h1>
        <form onSubmit={handleSubmit} className="space-y-4 font-inter">
          <div>
            <label className='text-gray-700'>Enter month :</label>
            <input
              type="number"
              placeholder="Enter month (MM)..."
              value={month}
              name='month'
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 mt-2 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label>Enter year: </label>
            <input
              type="number"
              placeholder="Enter Year (YYYY)..."
              value={year}
              name='year'
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 mt-2 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor='Charge'> Enter Charge</label>
            <input
              type="number"
              placeholder="Enter Charge..."
              value={charge}
              name='Charge'
              onChange={(e) => setCharge(e.target.value)}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label>Enter extra charges for: </label>
            <input
              type="text"
              placeholder="Extra Charges..."
              value={festival}
              name='festival'
              onChange={(e) => setFestival(e.target.value)}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor='registrationNumber'> Enter Registration Number: </label>
            <div className="relative flex items-center w-full group mt-2">
              <input
                type="number"
                placeholder="Registration-Number"
                value={registrationNumber}
                name='registrationNumber'
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
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
          <button
            type="submit"
            className=" bg-blue-500 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default FestCharge;
