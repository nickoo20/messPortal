// import React, { useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { jwtDecode } from "jwt-decode";
// import toast from 'react-hot-toast';
// const ToggleHostelChange = () => {
//   const [message, setMessage] = useState('');

//   const togglePermission = async () => {
//     try {
      

//       const response = await axios.put(`http://localhost:8080/api/toggle-hostel-change`,{
//           withCredentials:true
//       });
//        toast.success("Setting Changed Successfully")
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error('Error toggling hostel change:', error.response.data);
//       toast.error("An error occurrred");
//       setMessage('Failed to toggle hostel change permission');
//     }
//   };
//   const token = Cookies.get("access_token");
//       const decoded = jwtDecode(token);
//       console.log(decoded)
//   return (
//     <div className="mt-4">
//       <button
//         onClick={togglePermission}
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//       >
//         Toggle Hostel Change Permission
//       </button>
//       {message && <p className="mt-2 text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default ToggleHostelChange;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';
const ToggleHostelChange = () => {
  const [enableHostelChange, setEnableHostelChange] = useState(false); // State to hold enableHostelChange status
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEnableHostelChangeStatus();
  }, []);

  const fetchEnableHostelChangeStatus = async () => {
    try {
      const token = Cookies.get("access_token");
      const response = await axios.get(
        `http://localhost:8080/api/toggle-hostel-change`,
        {
          withCredentials: true,
          
        }
      );

      setEnableHostelChange(response.data.enableHostelChange); // Assuming response.data.enableHostelChange contains the status
    } catch (error) {
      console.error('Error fetching enableHostelChange status:', error.response.data);
      // Handle error fetching status
    }
  };

  const togglePermission = async () => {
    try {
      const token = Cookies.get("access_token");
      const decoded = jwtDecode(token);

      const response = await axios.put(
        `http://localhost:8080/api/toggle-hostel-change`,{
          enableHostelChange:!enableHostelChange
        },

        {
          withCredentials: true,
          
        }
      );
      toast.success("Setting Changed Successfully!")
      setMessage(response.data.message);
      setEnableHostelChange(response.data.enableHostelChange); // Update status after toggling
    } catch (error) {
        toast.error("An error occurred");
      console.error('Error toggling hostel change:', error.response.data);
      setMessage('Failed to toggle hostel change permission');
    }
  };

  return (
    <div className="mt-4">
      <p className="mb-2">Enable Hostel Change Status: {enableHostelChange ? 'Enabled' : 'Disabled'}</p>
      <button
        onClick={togglePermission}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Toggle Hostel Change Permission
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default ToggleHostelChange;

