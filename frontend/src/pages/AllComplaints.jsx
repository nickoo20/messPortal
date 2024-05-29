import { useEffect, useState } from "react";
import axios from 'axios';
import Complaint from "../components/Complaint";
import { useAuth } from "../../context/userContext";

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [auth, setAuth] = useAuth() ;


  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/complaints/all");
        console.log(res) ;
        setComplaints(res.data); // Assuming res.data is an array of complaints
      } catch (err) {
        console.error("Error fetching complaints:", err.message);
      }
    };

    fetchAllComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 ">
        <h1 className="text-2xl font-bold mb-6 text-red-800">All Complaints</h1>
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <>
              <div className="flex flex-col gap-5 ">
                <Complaint complaint={complaint}/>
              </div>
            </>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No complaints found.</p>
        )}
      </div>
    </div>
  );
};

export default AllComplaints;
