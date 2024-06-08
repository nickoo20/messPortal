import { useEffect, useState } from "react";
import axios from 'axios';
import Complaint from "../components/Complaint";
import CreatePost from "./CreatePost";
import useGetAllComplaints from "../hooks/useGetAllComplaints";
import { useSelector } from "react-redux";

const AllComplaints = () => {
  const {allComplaints} = useSelector(state=>state.complaint); 
  // const [complaints, setComplaints] = useState([]);
  useGetAllComplaints() ;
  // console.log(complaints)  ;

  // useEffect(() => {
  //   const fetchAllComplaints = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8080/api/complaints/all",{
  //         withCredentials:true,
  //       });
  //       // console.log(res) ;
  //       setComplaints(res?.data.comp1); // Assuming res.data is an array of complaints
  //     } catch (err) {
  //       console.error("Error fetching complaints:", err.message);
  //     }
  //   };

  //   fetchAllComplaints() ; 
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
      <CreatePost/>
      <div className="">
        <h1 className="text-2xl font-bold mb-6 text-red-800 font-jakarta">All Complaints</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mx-auto">
        {/* {complaints.length > 0 ? (
          complaints?.map((complaint) => (
            <Complaint key={complaint._id} complaint={complaint}/>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No complaints found.</p>
        )} */}
        {
          allComplaints.length > 0 ? (allComplaints?.map((complaint)=>(
            <Complaint key={complaint._id} complaint={complaint}/>
          ))) : (
            <p className="text-gray-600 text-lg">No complaints found.</p>
          )
        }
        </div>
      </div>
        </div>
    </div>
  );
};

export default AllComplaints;
