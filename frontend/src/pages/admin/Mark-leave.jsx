import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaInfoCircle } from "react-icons/fa";

const MarkLeave = () => {
  const initialData = {
    registrationNumber: 0,
    startDate: "",
    endDate: "",
  };

  const [inputData, setInputData] = useState(initialData);
  const { user } = useSelector(state => state.admin);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inputData);
      const response = await axios.post('http://localhost:8080/api/mark-leave', inputData, {
        withCredentials: true,
      });

      console.log(response);
      if (response?.status === 200) {
        toast.success(response.data.message);
      }
      console.log("sent");
    } catch (error) {
      toast.error(error.message);
      console.log("error in axios");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please Login first!!</h1>
        </div>
      </div>
    );
  }

  if (user.role !== "warden") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You do not have permission to access this page...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <h1 className="text-3xl text-center text-blue-800 font-jakarta font-bold mb-6 p-4">Register Student Leave</h1>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md border-r-4 border-blue-500 w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            {message && (
              <div className={`p-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {message.text}
              </div>
            )}
            <div className='form-group'>
              <label className='block text-sm font-medium text-gray-700 font-inter'>Enter Registration Number of student to mark leave :</label>
            <div className="relative flex items-center w-full group mt-2">
              <input
                type="number"
                name="registrationNumber"
                value={inputData.registrationNumber}
                onChange={handleChange}
                placeholder="Write in format as shown in icon..."
                required
                className="border p-2 w-full rounded-md focus:outline-none text-sm"
              />
              <div className="ml-10 flex items-center">
                <FaInfoCircle className="text-gray-500 cursor-pointer" />
                <div className="absolute bottom-8 left-0 w-64 p-2 bg-white border border-gray-300 rounded-md shadow-md text-xs text-gray-700 hidden group-hover:flex flex-col">

                  <div>(e.g., Write in format <span className="text-green-700">20200832</span> from <span className="text-green-700">2020</span>NITSGR<span className="text-green-700">0832</span>)</div>
                </div>
              </div>
            </div>
            </div>
            <div className="form-group">
              <label htmlFor="startDate" className="block font-inter text-sm font-medium text-gray-700">Enter Start Date :</label>
              <input
                type="date"
                name="startDate"
                value={inputData.startDate}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate" className="block text-sm font-medium font-inter text-gray-700">Enter End Date :</label>
              <input
                type="date"
                name="endDate"
                value={inputData.endDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div className='flex justify-center items-center'>
              <button type="submit" className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-sm focus:outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarkLeave;
