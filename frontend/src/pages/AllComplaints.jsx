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
    <div className="">
      <h1 className="text-3xl font-bold mb-6 text-[#003366] font-jakarta text-center">All Complaints</h1>
      <CreatePost/>
      <div className="bg-gray-100 min-h-screen p-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mx-auto">
        {/* {complaints.length > 0 ? (
          complaints?.map((complaint) => (
            <Complaint key={complaint._id} complaint={complaint}/>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No complaints found.</p>
        )} */}
        {
          allComplaints?.length > 0 ? (allComplaints?.map((complaint) => (
            <Complaint key={complaint._id} complaint={complaint}/>
          ))) : (
            <p className="text-gray-600 text-lg">No complaints found.</p>
          )
        }
        </div>
      </div>
        </div>
  );
};

export default AllComplaints;
