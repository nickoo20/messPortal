import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/complaints/complaintSlice";
import { useDispatch } from "react-redux";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   fetchComplaints() ;
  // },[]) ;

  // const fetchComplaints = async() => {
  //   try{
  //     const res = await axios.get('http://localhost:8080/api/complaints/all') ;
  //   }catch(err){
  //     console.log(error) ;
  //   }
  // }

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
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      setLoading(false);
      dispatch(getRefresh());
      toast.success("Complaint created successfully!");
      // Reset the form
      setTitle("");
      setDescription("");
    } catch (err) {
      setLoading(false);
      toast.error("Error creating complaint");
    }
  };
  return (
    <>
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6 font-jakarta text-blue-700">Have a problem ? Write a Complaint ....</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex ">
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
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-800 text-white rounded-2xl
              font-bold py-2 px-6 focus:outline-none focus:shadow-outline tracking-widest"
              disabled={loading}
            >
              {loading ? "Creating..." : "Post"}
            </button>
          </div>
        </form>
      </div>
      
    </>
  );
};

export default CreatePost;
