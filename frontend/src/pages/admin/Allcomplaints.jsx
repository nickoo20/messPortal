import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import LoadingSpinner from '../../components/LoadingSpinner'; 

const AllComplaints = () => {
  const { user } = useSelector((state) => state.admin);
  const [complaints, setComplaints] = useState([]);
  const [comment, setComment] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [forwarding, setForwarding] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [resolvingComplaintId, setResolvingComplaintId] = useState(null);
  const [complaintComments, setComplaintComments] = useState({});

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/complaints", {
          withCredentials: true,
        });
        setComplaints(response.data.comp1);
      } catch (error) {
        console.error("Error fetching complaints", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setResolving(true);
      setResolvingComplaintId(id);
      await axios.patch(`http://localhost:8080/api/complaints/${id}`, { status });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status } : complaint
        )
      );
      setNotification({ message: "Status updated successfully!", type: "success" });
      setResolving(false);
      setResolvingComplaintId(null);
    } catch (error) {
      console.error("Error updating status", error);
      setNotification({ message: "Failed to update status", type: "error" });
      setResolving(false);
      setResolvingComplaintId(null);
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
      setForwarding(true);
      setLoading(true);
      await axios.put(
        `http://localhost:8080/api/complaints/escalate/${complaintId}`,
        { comment },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setNotification({ message: "Comment sent successfully!", type: "success" });
      setComment(""); // Clear the comment field
      handleStatusChange(complaintId, "escalated");
      setLoading(false);
      setForwarding(false);
      setSelectedComplaint(null); // Reset after sending
    } catch (error) {
      setLoading(false);
      setForwarding(false);
      console.error("Error sending comment", error);
      setNotification({ message: "Failed to send comment", type: "error" });
    }
  };

  const fetchComments = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/complaints/comment/${id}`);
      setComplaintComments((prevComments) => ({
        ...prevComments,
        [id]: res.data,
      }));
      console.log('fetchComments: ', res.data) ;
    } catch (err) {
      console.log("Error fetching comments", err.message);
    }
  };

  const toggleComments = (id) => {
    if (complaintComments[id]) {
      setComplaintComments((prevComments) => ({
        ...prevComments,
        [id]: null,
      }));
    } else {
      fetchComments(id);
    }
  };

  if (!user) {
    return <h1>Please Login first!!</h1>;
  }

  if (user.role !== "warden") {
    return <h1>You do not have permission to this page...</h1>;
  }

  return (
    <div className="min-h-screen p-4 pt-0">
      {notification.message && (
        <div
          className={`${
            notification.type === "success" ? "bg-green-200" : "bg-red-200"
          } p-4 rounded-md mb-4`}
        >
          {notification.message}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-red-800 font-jakarta">All Complaints</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white hover:border-b-2 border-l-4 border-r-4 rounded-lg p-6 mb-4">
              <div className="text-gray-500 text-sm my-1">
                {format(new Date(complaint.createdAt), "PP p")}
              </div>
              <h2 className="text-md font-inter font-semibold text-gray-800 ">
                {complaint.title}
              </h2>
              <p className="text-gray-700 p-2 rounded-lg">
                {complaint.description}
              </p>
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
                <button
                  onClick={() => toggleComments(complaint._id)}
                  className="text-blue-500 hover:underline"
                >
                  {complaintComments[complaint._id] ? "Hide Comments" : "Show Comments"}
                </button>
              </div>
              <div className="mt-4 flex flex-col md:flex-row justify-evenly items-center">
                <button
                  onClick={() => handleStatusChange(complaint._id, "resolved")}
                  className="bg-[#627254] text-[#DDDDDD] font-mono hover:bg-[#76885B] hover:opacity-85 rounded-full px-4 py-1 mr-2 text-sm"
                >
                  {resolving && resolvingComplaintId === complaint._id ? (
                    <LoadingSpinner />
                  ) : (
                    <span>Resolve</span>
                  )}
                </button>
                <button
                  onClick={() => handleForwardClick(complaint._id)}
                  className="bg-[#32012F] text-[#E2DFD0] font-mono hover:bg-[#524C42] hover:opacity-85 rounded-full px-4 py-1 text-sm"
                >
                  Forward
                </button>
              </div>
              <div className="flex items-center gap-4 mt-2 ">
                <div className="font-semibold text-gray-800 mt-2 text-sm">Status: </div>
                <div
                  className={`hover:text-white border focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 py-1 text-center me-2 mb-2 ${
                    complaint.status === "pending"
                      ? "text-yellow-400 border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300"
                      : complaint.status === "resolved"
                      ? "text-green-400 border-green-400 hover:bg-green-500 focus:ring-green-300"
                      : "text-purple-500 hover:border-purple-400 hover:bg-purple-500 focus:ring-purple-300 font-extrabold"
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
                      className="border rounded-xl p-2 focus:outline-none"
                    ></textarea>
                    <button
                      onClick={() => handleSendClick(complaint._id)}
                      className="bg-blue-500 w-1/4 text-white px-2 py-1 font-mono rounded-lg mt-2 hover:bg-blue-600 hover:opacity-95"
                    >
                      {!forwarding ? (
                        <span className="text-sm">Send</span>
                      ) : (
                        <div className="flex justify-center items-center">
                          <LoadingSpinner />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}
              {complaintComments[complaint._id] && (
                <div className="mt-4">
                  {complaintComments[complaint._id].map((comment) => (
                    <div key={comment._id} className="p-2 border-b border-gray-200">
                      {comment.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No complaints found.</p>
        )}
      </div>
    </div>
  );
};

export default AllComplaints;
