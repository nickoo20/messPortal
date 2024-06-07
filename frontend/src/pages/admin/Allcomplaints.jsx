// src/App.js
import React, { useEffect, useState } from "react" ;
import axios from "axios" ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" ;
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons" ; 
import { useSelector } from "react-redux" ;
import { format } from "date-fns" ;
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const AllComplaints = () => {
  const { user } = useSelector((state) => state.admin);
  const [complaints, setComplaints] = useState([]);
  const [comment, setComment] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/complaints",
          {
            withCredentials: true,
          }
        );
        setComplaints(response.data.comp1);
      } catch (error) {
        console.error("Error fetching complaints", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:8080/api/complaints/${id}`, {
        status,
      });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status } : complaint
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleForwardClick = (complaintId) => {
    setSelectedComplaint(complaintId);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendClick = async (complaintId) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/complaints/escalate/${complaintId}`,
        { comment },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Comment sent successfully!");
      setComment(""); // Clear the comment field
      handleStatusChange(complaintId, "escalated");
      setSelectedComplaint(null); // Reset after sending
    } catch (error) {
      console.error("Error sending comment", error);
      alert("Failed to send comment");
    }
  };

  if (!user) {
    return <h1>Please Login first!!</h1>;
  }

  if (user.role !== "warden") {
    return <h1>You do not have permission to this page...</h1>;
  }

  return (
    <div className="min-h-screen p-4">
      {/* <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6"> */}
        <h1 className="text-2xl font-bold mb-6 text-red-800 font-jakarta">All Complaints</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white shadow-md rounded-lg p-6 mb-4">
              <div className="text-gray-500 text-sm my-1">{format(new Date(complaint.createdAt), "PPpp")}</div>
              <h2 className="text-lg font-semibold text-gray-800">{complaint.title}</h2>
              <p className="text-gray-700 bg-gray-50 p-2 rounded-lg">{complaint.description}</p>
              <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 mt-4 flex items-center">
                <div className="flex items-center mr-4 text-blue-500 hover:text-blue-700 transition-colors duration-200">
                  <AiFillLike size={20} className="mr-1" />
                  <span>{complaint.upvotes.length}</span>
                </div>
                <div className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200">
                  <AiFillDislike size={20} className="mr-1" />
                  <span>{complaint.downvotes.length}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-evenly items-center">
                <button
                  onClick={() => handleStatusChange(complaint._id, "resolved")}
                  className="bg-[#799351] text-white font-mono hover:bg-green-700 hover:opacity-85 w-3/4 rounded-lg px-2 py-1 mr-2 text-sm"
                >
                  Resolve
                </button>
                <button
                  onClick={() => handleForwardClick(complaint._id)}
                  className="bg-[#FA7070] font-mono hover:bg-red-700 hover:opacity-85 w-3/4 rounded-lg text-white px-2 py-1 text-sm"
                >
                  Forward
                </button>
              </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="font-semibold text-gray-800 mt-2 text-sm">Status: </div>
                  <div
                    className={`border rounded-full px-2 text-white font-mono ${
                      complaint.status === "pending"
                        ? "bg-yellow-700"
                        : complaint.status === "resolved"
                        ? "bg-green-600"
                        : "bg-purple-600 font-semibold"
                    }`}
                  >
                    {complaint.status}
                  </div>
                </div>

              {selectedComplaint === complaint._id && (
                <div className="mt-4">
                  <p>
                    <label htmlFor="comments" className="font-semibold text-sm">Your Comment:</label>
                  </p>
                  <div className="flex items-center justify-between my-1">
                  <textarea
                    id="comments"
                    name="comment"
                    value={comment}
                    onChange={handleCommentChange}
                    rows="2"
                    cols="30"
                    className="border rounded p-2 focus:outline-none"
                  ></textarea>
                  <button
                    onClick={() => handleSendClick(complaint._id)}
                    className="bg-blue-500 w-1/4 text-white px-2 py-1 font-mono rounded-lg mt-2 hover:bg-blue-600 hover:opacity-95"
                  >
                    Send
                  </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No complaints found.</p>
        )}
      </div>
      </div>
    // </div>
  );
};

export default AllComplaints;
