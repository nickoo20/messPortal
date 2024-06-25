// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useSelector } from "react-redux";
import Complaint from "../components/Complaint";
import useGetMyComplaints from "../hooks/useGetMyComplaints";

const MyComplaints = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { myComplaints } = useSelector((state) => state.complaint);
  useGetMyComplaints(currentUser._id);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
    <h1 className="text-2xl md:text-3xl my-4 font-bold mb-6 text-gray-800 text-center font-jakarta">
      My Complaints
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {myComplaints?.length > 0 ? (
        myComplaints?.map((complaint) => (
          <Complaint key={complaint._id} complaint={complaint} />
        ))
      ) : (
        <p className="text-gray-600 text-lg col-span-full text-center">No complaints found.</p>
      )}
    </div>
  </div>
  );
};

export default MyComplaints;
