import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import LoadingSpinner from '../../components/LoadingSpinner'; 
import { FaCommentDots } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { ImForward } from "react-icons/im";
import { MdThumbUp } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";

const Modal = ({ show, onClose, comments }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-full sm:w-1/2 lg:w-2/5 xl:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <MdClose size={25}/>
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {comments?.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="flex items-center justify-between bg-gray-50 mb-2 rounded-full border">
                <div className="flex items-center">
                  <div className="p-2 border-gray-400 text-xs">
                    {comment.user.email}
                  </div>
                  <div className="p-2 text-sm border-gray-200">
                    {comment.text}
                  </div>
                </div>
                <div className="p-2 border-gray-200 text-xs">
                {format(new Date(comment.createdAt), "dd MMM")}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const AllComplaints = () => {
  const { user } = useSelector((state) => state.admin);
  const [complaints, setComplaints] = useState([]);
  const [comment, setComment] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loadingComplaints, setLoadingComplaints] = useState(false);
  const [loadingForwarding, setLoadingForwarding] = useState(false);
  const [loadingSendingComment, setLoadingSendingComment] = useState(false);
  const [loadingFetchingComments, setLoadingFetchingComments] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [resolvingComplaintId, setResolvingComplaintId] = useState(null);
  const [complaintComments, setComplaintComments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoadingComplaints(true);
      try {
        const response = await axios.get("http://localhost:8080/api/complaints", {
          withCredentials: true,
        });
        setComplaints(response.data.comp1);
      } catch (error) {
        console.error("Error fetching complaints", error);
        setNotification({ message: "Failed to fetch complaints", type: "error" });
      } finally {
        setLoadingComplaints(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setResolving(true);
      setResolvingComplaintId(id);
      await axios.patch(`http://localhost:8080/api/complaints/${id}`, { status }, {
        withCredentials: true,
      });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status } : complaint
        )
      );
      setNotification({ message: "Status updated successfully!", type: "success" });
    } catch (error) {
      console.error("Error updating status", error);
      setNotification({ message: "Failed to update status", type: "error" });
    } finally {
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
      setLoadingSendingComment(true);
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
    } catch (error) {
      console.error("Error sending comment", error);
      setNotification({ message: "Failed to send comment", type: "error" });
    } finally {
      setLoadingSendingComment(false);
      setSelectedComplaint(null); // Reset after sending
    }
  };

  const fetchComments = async (id) => {
    setLoadingFetchingComments(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/complaints/comment/${id}`, {
        withCredentials: true,
      });
      setComplaintComments(res.data);
      setShowModal(true);
    } catch (err) {
      console.log("Error fetching comments", err.message);
    } finally {
      setLoadingFetchingComments(false);
    }
  };

  const toggleComments = (id) => {
    if (showModal) {
      setShowModal(false);
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

  if (loadingComplaints) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-4 bg-gray-100">
      {notification.message && (
        <div
          className={`${
            notification.type === "success" ? "bg-green-200" : "bg-red-200"
          } p-4 rounded-md mb-4`}
        >
          {notification.message}
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-red-800 font-jakarta text-center">
        All Complaints
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {complaints?.length > 0 ? (
          complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="max-w-sm min-h-[300px] border shadow-md hover:border-b-4 bg-white rounded-md p-6 flex flex-col cursor-pointer hover:opacity-95"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-inter font-semibold text-gray-800">
                  {complaint.title}
                </h2>
                <div className="text-gray-500  text-xs my-1">
                  {format(new Date(complaint.createdAt), "dd MMM")}
                </div>
              </div>
              <div className="flex gap-4 items-center my-2">
                <div className="text-sm text-gray-600  flex items-center">
                  <div className="flex items-center mr-4 text-blue-500 hover:text-blue-700 transition-colors duration-200">
                    <AiFillLike size={18} className="mr-1" />
                    <span>{complaint.upvotes.length}</span>
                  </div>
                  <div className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200">
                    <AiFillDislike size={18} className="mr-1" />
                    <span>{complaint.downvotes.length}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleComments(complaint._id)}
                    className="text-gray-500 "
                  >
                    <FaCommentDots size={18} />
                  </button>
                  <div className="text-xs">{complaint.comments.length}</div>
                </div>
              </div>
              <p className="text-gray-700 font-inter text-sm ">
                {complaint.description}
              </p>
              <div className="mt-4 flex items-center">
                <button
                  onClick={() => handleStatusChange(complaint._id, "resolved")}
                  className="font-roboto text-xs rounded-full px-2 py-1 mr-2 border border-green-500 text-green-700"
                >
                  {resolving && resolvingComplaintId === complaint._id ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="flex items-center gap-1">
                      <span>Resolve now</span>
                      <MdThumbUp size={15} />
                    </div>
                  )}
                </button>
                <button
                  onClick={() => handleForwardClick(complaint._id)}
                  className=" border-red-500 border flex items-center gap-2 text-xs text-red-700 font-roboto hover:opacity-85 rounded-full px-2 py-1"
                >
                  <span>Forward </span>
                  <ImForward size={15} />
                </button>
              </div>

              {selectedComplaint === complaint._id && (
                <div className="mt-2">
                  <p>
                    <label
                      htmlFor="comments"
                      className="text-gray-600 font-semibold text-sm italic"
                    >
                      Write an attached message to DSW :
                    </label>
                  </p>
                  <div className="flex items-center mr-10 justify-between mt-2">
                    <textarea
                      id="comments"
                      name="comment"
                      value={comment}
                      onChange={handleCommentChange}
                      rows="2"
                      cols="20"
                      className="border rounded-md p-2 focus:outline-none"
                    ></textarea>
                    <button
                      onClick={() => handleSendClick(complaint._id)}
                      className="bg-blue-500 text-white p-2 font-mono rounded-full mt-2 hover:bg-blue-600 hover:opacity-95"
                    >
                      {!loadingSendingComment ? (
                        <div className="text-xs flex items-center gap-2">
                          <span>Send</span>
                          <BsFillSendFill size={10} />
                        </div>
                      ) : (
                        <LoadingSpinner />
                      )}
                    </button>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 mt-2">
                <div className="font-semibold text-gray-600 text-sm">Status: </div>
                <div
                  className={`border-r-4 border-b-2 rounded-full shadow-sm px-2 py-1 italic text-xs font-mono ${
                    complaint.status === "pending"
                      ? "text-yellow-700 border-yellow-500"
                      : complaint.status === "resolved"
                      ? "text-green-600 border-green-500"
                      : "text-red-600 font-semibold border-red-500"
                  }`}
                >
                  {complaint.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg italic text-center">
            No complaints found.
          </p>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        comments={complaintComments}
      />
    </div>
  );
};

export default AllComplaints;
