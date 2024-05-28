import { useState, useEffect } from 'react';
import axios from 'axios';

const Complaints = () => {
  const [userComplaints, setUserComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const userRes = await axios.get('http://localhost:8080/api/complaints/my') ;
        const allRes = await axios.get('http://localhost:8080/api/complaints/all') ;
        console.log(userRes);
        console.log(allRes);
        setUserComplaints(userRes.data);
        setAllComplaints(allRes.data);
      } catch (error) {
        console.error('Error fetching complaints:', error.message);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Complaints</h2>
      <ul>
        {userComplaints.map(complaint => (
          <li key={complaint._id}>{complaint.description}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-4 mb-4">All Complaints</h2>
      <ul>
        {allComplaints.map(complaint => (
          <li key={complaint._id}>{complaint.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Complaints;
