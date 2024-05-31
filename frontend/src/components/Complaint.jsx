import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../redux/complaints/complaintSlice";

const Complaint = ({ complaint }) => {
  console.log(complaint);
  const { currentUser } = useSelector((state) => state.user);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(complaint.comments);
  const [upvotes, setUpvotes] = useState(complaint.upvotes);
  const [downvotes, setDownvotes] = useState(complaint.downvotes);
  const dispatch = useDispatch();

  const formattedDate = format(new Date(complaint.createdAt), "PPpp");
  const handleUpvote = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/complaints/upvote/${complaint?._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(getRefresh());
      toast.success(res?.data.message);
      setUpvotes(res?.data?.upvotes || []);
    } catch (err) {
      toast.error("Error upvoting complaint");
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/complaints/downvote/${complaint?._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(getRefresh());
      toast.error(res?.data.message);
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
      setComments(res.data.comments);
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
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 rounded-lg mb-4 ">
      <div className="bg-white shadow-md rounded-lg cursor-pointer">
        <div className="p-6">
          <div className="flex justify-between ">
            <div className="text-gray-500 text-sm mt-4">{formattedDate}</div>
            <div>
              {currentUser?._id === complaint?.createdBy?._id && (
                <div
                  onClick={() => deleteComplaint(complaint?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 text-red-700 rounded-full cursor-pointer">
                    <MdOutlineDeleteOutline size={25} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            {complaint?.title}
          </h2>
          <p className="text-gray-700">{complaint?.description}</p>
          <div className="text-sm text-gray-600 mt-4">
            <div className="flex items-center">
              <button
                onClick={handleUpvote}
                className="flex items-center mr-4 text-blue-500 hover:text-blue-700 transition-colors duration-200"
              >
                <AiFillLike size={20} className="mr-1" /> {upvotes.length}
              </button>
              <button
                onClick={handleDownvote}
                className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <AiFillDislike size={20} className="mr-1" /> {downvotes.length}
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="text-md font-semibold text-gray-700">
                  Comments
                </span>
                <div className="flex gap-1 items-center cursor-pointer group">
                  <FaRegComment
                    className="w-4 h-4 text-slate-500 group-hover:text-sky-400"
                    onClick={() =>
                      document
                        .getElementById(`comments_modal${complaint?._id}`)
                        .showModal()
                    }
                  />
                  <span className="text-sm text-slate-500 group-hover:text-sky-400">
                    {comments.length}
                  </span>
                </div>
              </div>
              <dialog
                id={`comments_modal${complaint?._id}`}
                className="modal fixed inset-0 flex items-center justify-center"
              >
                <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                  <span className="text-md font-semibold text-gray-700">
                    Comments
                  </span>
                  <div className="flex flex-col gap-3 max-h-60 overflow-y-auto mt-2">
                    {comments.length === 0 ? (
                      <p className="text-sm text-slate-500">
                        No comments yet 🤔
                      </p>
                    ) : (
                      comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="flex gap-2 items-start"
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="font-bold">
                                {comment?.user.name}
                              </span>
                              <span className="text-gray-700 text-sm">
                                @{comment?.user.email}
                              </span>
                            </div>
                            <div className="text-sm">{comment?.text}</div>
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
                      className="textarea w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-800 text-white rounded-full py-2 px-4 focus:outline-none focus:shadow-outline"
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
          <div className="flex items-center gap-4 mt-2">
            <div className="font-semibold text-gray-800">Created By:</div>
            <div>
              <div className="text-gray-500">{complaint?.createdBy?.name}</div>
              <div className="text-gray-500 text-sm">
                ({complaint?.createdBy?.email})
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="font-semibold text-gray-800">Status: </div>
            <div
              className={` border rounded-full px-2 text-white
                ${complaint.status === "pending"
                  ? "bg-yellow-700"
                  : "bg-purple-600 font-semibold"}
              `}
            >
              {complaint.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
