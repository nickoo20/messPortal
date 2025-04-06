import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ToggleHostelChange = () => {
  const [enableHostelChange, setEnableHostelChange] = useState(false); // State to hold enableHostelChange status
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading spinner

  useEffect(() => {
    fetchEnableHostelChangeStatus();
  }, []);

  const fetchEnableHostelChangeStatus = async () => {
    setLoading(true); // Start loading spinner
    try {
      const token = Cookies.get("access_token");
      const response = await axios.get(
        `${BACKEND_URL}/api/toggle-hostel-change`,
        {
          withCredentials: true,
        }
      );

      setEnableHostelChange(response.data.enableHostelChange); // Assuming response.data.enableHostelChange contains the status
    } catch (error) {
      console.error('Error fetching enableHostelChange status:', error.response.data);
      // Handle error fetching status
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const togglePermission = async () => {
    setLoading(true); // Start loading spinner
    try {
      const token = Cookies.get("access_token");
      const decoded = jwtDecode(token);

      const response = await axios.put(
        `${BACKEND_URL}/api/toggle-hostel-change`,{
          enableHostelChange: !enableHostelChange
        },
        {
          withCredentials: true,
        }
      );
      
      toast.success("Setting Changed Successfully!");
      setMessage(response.data.message);
      setEnableHostelChange(response.data.enableHostelChange); // Update status after toggling
    } catch (error) {
      toast.error("An error occurred");
      console.error('Error toggling hostel change:', error.response.data);
      setMessage('Failed to toggle hostel change permission');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className='min-h-screen'>
      <div className="flex flex-col items-center justify-center rounded-lg gap-4">
        <p className="text-lg font-semibold text-center mt-10">Toggle Hostel Change Permission</p>
        <div className="flex items-center justify-center">
          <p className="mr-2">Enable Hostel Change Status:</p>
          <span className={`px-2 py-1 rounded-full italic text-xs ${enableHostelChange ? 'bg-green-700 text-white' : 'bg-red-500 text-white'}`}>
            {enableHostelChange ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <div className="flex justify-center text-sm">
          <button
            onClick={togglePermission}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Loading...' : (enableHostelChange ? 'Disable' : 'Enable') + ' Hostel Change'}
          </button>
        </div>
        {loading && <LoadingSpinner />} {/* Display loading spinner */}
        {message && <p className="text-green-600 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ToggleHostelChange;
