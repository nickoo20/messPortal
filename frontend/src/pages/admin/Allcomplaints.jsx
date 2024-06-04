// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

import { jwtDecode } from "jwt-decode";
import { useAuth } from "/Users/richashrivastava/finalyear/messPortal/frontend/src/context/userContext.jsx";
const App = () => {
  const [auth, setAuth] = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [comment,setComment]=useState("null");
  const [fl,setfl]=useState(null)
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/complaints', {  
          withCredentials: true
        });
        //console.log(response);
        setComplaints(response.data.comp1);
        
      } catch (error) {
        console.error('Error fetching complaints', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:8080/api/complaints/${id}`, { status });
      setComplaints(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint._id === id ? { ...complaint, status } : complaint
        )
      );
    } catch (error) {
      console.error('Error updating status', error);
    }
  };
  const handleForwardClick = (complaintId) => {
    setfl(complaintId);
    //setSelectedComplaint(complaintId);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendClick = async (complaintId) => {
    try {
      console.log(complaintId) 
      const res=await axios.put(`http://localhost:8080/api/complaints/escalate/${complaintId}`,JSON.stringify({ comment }),{
        
        //comment: comment,
        
    
      headers: {
        'Content-Type': 'application/json'
      },
        withCredentials: true 
      });
      console.log(res);
      alert('Comment sent successfully!');
      //setSelectedComplaint(null); // Reset after sending
      setComment(''); // Clear the comment field
      handleStatusChange(complaintId, 'escalated'); // Call handleStatusChange
    } catch (error) {
      console.error('Error sending comment', error);
      alert('Failed to send comment');
    }
  };
  if (!auth.user) {
    return (
      <>
        <h1>Please Login first!!</h1>
      </>
    );
  }
  const token=Cookies.get("access_token")
  const decoded=jwtDecode(token);
  const role=decoded.role;
  if (role!== "warden") {
    return <h1>You do not have permission to this page...</h1>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Complaints</h1>
      {complaints.map(complaint => (
        
        <div key={complaint._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          
          <h2 className="text-xl font-semibold">{complaint.title}</h2>
          <p className="text-gray-700">{complaint.description}</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center mr-4">
              <FontAwesomeIcon icon={faThumbsUp} className="text-green-600 mr-1" />
              <span>{complaint.upvotes.length}</span>
            </div>
            <div className="flex items-center mr-4">
              <FontAwesomeIcon icon={faThumbsDown} className="text-red-600 mr-1" />
              <span>{complaint.downvotes.length}</span>
            </div>
            <div>
              <span className="mr-1">Status:</span>
              <span className={`font-bold ${complaint.status === 'pending' ? 'text-yellow-500' : complaint.status === 'resolved' ? 'text-green-500' : 'text-red-500'}`}>
                {complaint.status}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => handleStatusChange(complaint._id, 'resolved')}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Resolve
            </button>
            <button
              onClick={() => handleForwardClick(complaint._id, 'escalated')}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Forward
            </button>
          </div>
          
          {fl===complaint._id&&(<div>
          <p><label htmlFor="comments">Your Comment:</label></p>
  <textarea id="comments" name="comment" value={comment}
  onChange={(e)=>handleCommentChange(e)} rows="4" cols="50"></textarea>
  <button
              onClick={() => handleSendClick(complaint._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"  
            >
              Send
            </button>
            </div>
          )}
          
        </div>
      ))}
    </div>
  );
};

export default App;
