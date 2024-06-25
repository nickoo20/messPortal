import { useEffect, useState } from "react";
import axios from 'axios';
import Complaint from "../components/Complaint";
import CreatePost from "./CreatePost";
import useGetAllComplaints from "../hooks/useGetAllComplaints";
import { useSelector } from "react-redux";

const AllComplaints = () => {
  const {allComplaints} = useSelector(state=>state.complaint); 
  useGetAllComplaints() ;

  return (
    <div className="bg-gray-100 min-h-screen p-4 rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#003366] font-jakarta text-center">All Complaints</h1>
      <CreatePost/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mx-auto">
        {
          allComplaints?.length > 0 ? (allComplaints?.map((complaint) => (
            <Complaint key={complaint._id} complaint={complaint}/>
          ))) : (
            <p className="text-gray-600 text-lg">No complaints found.</p>
          )
        }
        </div>
      </div>
  );
};

export default AllComplaints;
