import { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AiFillLike,AiFillDislike } from "react-icons/ai";


const Complaint = ({ complaint }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(complaint.comments);
  const [upvotes, setUpvotes] = useState(complaint.upvotes);
  const [downvotes, setDownvotes] = useState(complaint.downvotes);

  const formattedDate = format(new Date(complaint.createdAt), 'PPpp');

  const handleUpvote = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/complaints/upvote/${complaint._id}`,{
        withCredentials:true,
      });
      // console.log(res?.data) ;
      setUpvotes(res?.data?.upvotes);
    } catch (err) {
      toast.error("Error upvoting complaint");
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/complaints/downvote/${complaint._id}`,{
        withCredentials:true,
      });
      setDownvotes(res?.data?.downvotes);
    } catch (err) {
      toast.error("Error downvoting complaint");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/complaints/${complaint._id}/comments`, { text: commentText },{
        withCredentials:true,
      });
      setComments(res.data.comments);
      setCommentText('');
    } catch (err) {
      toast.error("Error adding comment");
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg mb-4">
      <h2 className="text-xl font-semibold">{complaint.title}</h2>
      <p className="text-gray-700">{complaint.description}</p>
      {complaint.createdBy && (
        <div className="text-sm text-gray-600 mt-2">
          <p>Created by: {complaint.createdBy.name} ({complaint.createdBy.email})</p>
        </div>
      )}
      <div className="text-sm text-gray-600 mt-2">
        <p>Created at: {formattedDate}</p>
      </div>
      <div className="flex items-center mt-4">
        <button onClick={handleUpvote} className="mr-2 text-blue-500 hover:text-blue-700">
          <AiFillLike/> {upvotes.length}
        </button>
        <button onClick={handleDownvote} className="text-red-500 hover:text-red-700">
          <AiFillDislike/> {downvotes.length}
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {comments.map((comment) => (
          <div key={comment._id} className="mb-2 p-2 border border-gray-300 rounded">
            <p>{comment.text}</p>
            <p className="text-sm text-gray-600">By {comment.createdBy.name} at {format(new Date(comment.createdAt), 'PPpp')}</p>
          </div>
        ))}
        { (
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none flex-1"
              required
            />
            <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Complaint;
