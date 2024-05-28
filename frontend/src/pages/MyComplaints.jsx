import { useEffect, useState } from "react";
import axios from 'axios';
import Complaint from "../components/Complaint";
import { useAuth } from "../../context/userContext";
import {toast} from 'react-hot-toast'; 
import { useNavigate, useParams } from "react-router-dom";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [auth, setAuth] = useAuth() ;
  const navigate=useNavigate() ;

  const user = auth?.user ;

  if(!user){
      navigate('/login-student'); 
  } 
  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const res = await axios.get(`/api/complaints/${user?._id}`,{
          withCredentials:true,
          
        }) ;
        console.log(res) ;
        // setComplaints(res); // Assuming res.data is an array of complaints
        if(!res.ok){
          toast.error(res?.data?.message);
          return;
        }
        // const data=res.json(); 
      } catch (err) {
        toast.error(err.message) ;
        console.error("Error fetching complaints:", err.message);
      }
    };
    fetchMyComplaints();
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 ">
        <h1 className="text-2xl font-bold mb-6 text-red-800">My Complaints</h1>
        {/* {complaints.length > 0 ? (
          // complaints.map((complaint) => (
          //   <>z
          //     <div className="flex flex-col gap-5 ">
          //       <Complaint complaint={complaint}/>
          //     </div>
          //   </>
          // ))
        ) : (
          <p className="text-gray-600 text-lg">No complaints found.</p>
        )} */}
      </div>
    </div>
  );
};

export default MyComplaints;
