import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/complaints/complaintSlice";
import { useDispatch } from "react-redux";
import Modal from '../components/Modal' // Import the Modal component
import { GiClick } from "react-icons/gi";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const toggleModalVisibility = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/complaints/create",
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      dispatch(getRefresh());
      // Reset the form
      setTitle("");
      setDescription("");
      toggleModalVisibility(); // Close the modal after submission
    } catch (err) {
      setLoading(false);
      toast.error("Error creating complaint");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg max-w-xs mx-auto mb-5 border-blue-300 border-b-4">
      <h1
        className="text-md font-bold mb-2 italic font-jakarta text-blue-700 cursor-pointer flex items-center justify-center"
        onClick={toggleModalVisibility}
      >
        <span>Write a Complaint... </span>
        <GiClick/>
      </h1>
      <Modal show={showModal} onClose={toggleModalVisibility}>
        <form onSubmit={handleSubmit}>
          <h1 className="text-blue-600 mb-2 italic text-md">Your complaint: </h1>
          <div className="mb-4 flex">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm focus:outline-none focus:shadow-outline"
              placeholder="Enter title of your complaint..."
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              placeholder="Write your description..."
              rows="2"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:opacity-85 hover:bg-blue-800 text-white rounded-2xl
              font-bold py-2 px-8 focus:outline-none focus:shadow-outline tracking-widest"
              disabled={loading}
            >
              {loading ? "Creating..." : "Post"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePost;
