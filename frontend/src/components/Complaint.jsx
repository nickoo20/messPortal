import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../redux/complaints/complaintSlice";
import LoadingSpinner from "./LoadingSpinner";

const Complaint = ({ complaint }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(complaint.comments);
  const [upvotes, setUpvotes] = useState(complaint.upvotes);
  const [downvotes, setDownvotes] = useState(complaint.downvotes);
  const dispatch = useDispatch();
  const formattedDate = format(new Date(complaint.createdAt), "PP");

  useEffect(() => {
    // Ensure we are using fresh data from the props
    setComments(complaint.comments || []);
    setUpvotes(complaint.upvotes || []);
    setDownvotes(complaint.downvotes || []);
  }, [complaint]);

  const handleUpvote = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/complaints/upvote/${complaint?._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(getRefresh());
      console.log("upvote: ", res);
      // toast.success(res?.data.message);
      setUpvotes(res?.data?.upvotes || []);
    } catch (err) {
      toast.error("Error upvoting complaint");
    }
  };

  const handleDownvote = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `http://localhost:8080/api/complaints/downvote/${complaint?._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(getRefresh());
      // toast.error(res?.data.message);
      setDownvotes(res?.data?.downvotes || []);
    } catch (err) {
      toast.error("Error downvoting complaint");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/complaints/comment/${complaint?._id}`,
        { text: commentText },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      setComments(res?.data.comments);
      setCommentText("");
    } catch (err) {
      toast.error("Error adding comment");
    }
  };

  const deleteComplaint = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(
        `http://localhost:8080/api/complaints/delete/${id}`
      );
      dispatch(getRefresh());
      toast.success(res?.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(
        `http://localhost:8080/api/complaints/comment/${complaint._id}/${commentId}`
      );
      console.log('deleteComment: ',res);
      if (res?.data.success === false) {
        toast.error("Error deleting comment");
        return;
      }
      // toast.success(res?.data.message) ;
      dispatch(getRefresh());
      setComments(res?.data.comments);
    } catch (err) {
      toast.error("Error deleting comment");
    }
  };

  return (
    <div className="p-2 rounded-lg mb-4 w-full mx-auto min-h-[200px] md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
      <div className="flex flex-col gap-2 shadow-sm rounded-lg p-5 border-b-4 border-blue-300 hover:shadow-sm bg-white">
        <div className="flex items-end justify-between">
          <div className="text-gray-500 text-xs mt-4">{formattedDate}</div>
          {currentUser?._id === complaint?.createdBy?._id && (
            <div
              onClick={() => deleteComplaint(complaint?._id)}
              className="flex items-center"
            >
              <div className="p-2 text-red-700 rounded-full cursor-pointer">
                <MdOutlineDeleteOutline size={22} />
              </div>
            </div>
          )}
        </div>
        <h2 className="text-md font-bold text-gray-600">{complaint?.title}</h2>
        <p className="text-gray-700 rounded-lg text-sm">{complaint?.description}</p>
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-8">
              <button
                onClick={handleUpvote}
                className="flex items-center mr-1 text-[#008080] hover:text-green-700 transition-colors duration-200"
              >
                <AiFillLike size={20} className="mr-1" /> {upvotes?.length}
              </button>
              <button
                onClick={handleDownvote}
                className="flex items-center text-[#8B0000] hover:text-red-700 transition-colors duration-200"
              >
                <AiFillDislike size={20} className="mr-1" /> {downvotes?.length}
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center cursor-pointer group">
                  <FaRegComment
                    size={20}
                    className="w-4 h-4 text-slate-500 group-hover:text-sky-400"
                    onClick={() =>
                      document
                        .getElementById(`comments_modal${complaint?._id}`)
                        .showModal()
                    }
                  />
                  <span className="text-sm text-slate-500 group-hover:text-sky-400">
                    {comments?.length}
                  </span>
                </div>
              </div>
              <dialog
                id={`comments_modal${complaint?._id}`}
                className="modal inset-0 flex items-center justify-center mt-10 fixed"
              >
                <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto w-full">
                  <span className="text-md font-semibold text-gray-700 font-jakarta">
                    Comments :
                  </span>
                  <div className="flex flex-col gap-3 max-h-60 overflow-y-auto mt-2">
                    {comments?.length === 0 ? (
                      <p className="text-sm text-slate-500">No comments yet 🤔</p>
                    ) : (
                      comments?.map((comment) => (
                        <div key={comment._id}>
                          <div className="flex flex-col p-1 justify-center bg-gray-50 w-full">
                            <div className="flex justify-between w-full">
                              <div className="flex items-center gap-1 text-xs">
                                <span className="font-bold text-gray-600">
                                  {comment?.user.name}
                                </span>
                                <span className="text-gray-500 italic">
                                  @{comment?.user.email}
                                </span>
                              </div>
                              <div className="flex flex-col items-end">
                                <div className="text-xs text-gray-500">
                                  {format(new Date(comment.createdAt), "PP")}
                                </div>
                                {currentUser?._id === comment?.user._id && (
                                  <button
                                    onClick={() => deleteComment(comment._id)}
                                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                  >
                                    <MdOutlineDeleteOutline size={18} />
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="text-sm rounded-lg p-1">
                              {comment?.text}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <form
                    onSubmit={handleCommentSubmit}
                    className="flex gap-2 items-center mt-4 border-t border-gray-300 pt-2"
                  >
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="textarea w-full p-2 rounded border border-gray-300 focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                      focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs px-4 py-2 text-center mb-2"
                    >
                      Submit
                    </button>
                  </form>
                  <button
                    className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-full focus:outline-none focus:shadow-outline"
                    onClick={() =>
                      document
                        .getElementById(`comments_modal${complaint?._id}`)
                        .close()
                    }
                  >
                    Close
                  </button>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="font-semibold text-gray-800 text-sm">Status: </div>
          <div
            className={`border rounded-full px-2 text-xs font-mono sm:text-sm
                ${
                  complaint.status === "pending"
                    ? "text-yellow-700 border-yellow-500"
                    : complaint.status === "resolved"
                    ? "text-green-600 border-green-500"
                    : "text-red-600 shadow-sm font-semibold border-red-500"
                }
              `}
          >
            {complaint.status}
          </div>
        </div>
        <div className="flex flex-col xl:flex-row xl:items-center gap-2">
          <div className="font-semibold text-gray-700 text-sm">Created By:</div>
          <div className="flex flex-col">
            <div className="text-gray-500 italic text-xs">
              ({complaint?.createdBy?.email})
            </div>
            <div className="italic text-gray-500 text-xs">
              {complaint.createdBy?.hostelName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
