import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import LoadingSpinner from "../../components/LoadingSpinner";

const AddMenu = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [menu, setMenu] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("month", month);
    formData.append("year", year);
    formData.append("menu", menu);
    formData.append("menuPdf", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/menu/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setMessage("Menu added successfully!");
    } catch (error) {
      setMessage("Failed to add menu");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser.studentRep) {
    return <p className="text-center mt-6 text-red-500">You do not have permission to add a menu.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <button className="flex items-center text-blue-700 mb-6" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack size={30} />
        <span className="italic ml-2">Go Back to Menu</span>
      </button>
      <div className="bg-gary-50 border-r-4 border-green-500 rounded-lg shadow-sm max-w-lg w-full p-6 md:p-8">
        <h1 className="text-xl md:text-2xl mb-6 font-bold text-green-700 text-center">Add New Menu</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <label className="block text-gray-700 text-sm sm:w-1/4">Month:</label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              placeholder="Enter month for menu..."
              className="w-full sm:w-3/4 p-2 text-sm rounded-md focus:outline-none bg-gray-50"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <label className="block text-gray-700 text-sm sm:w-1/4">Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              placeholder="Enter year for menu..."
              className="w-full sm:w-3/4 p-2 text-sm rounded-md focus:outline-none bg-gray-50"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-2">
            <label className="block text-gray-700 text-sm sm:w-1/4">Menu:</label>
            <textarea
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              required
              placeholder="Write something..."
              className="w-full sm:w-3/4 p-2 text-sm rounded-md focus:outline-none bg-gray-50"
              rows={4}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <label className="block text-blue-700 text-sm sm:w-1/4">Upload PDF:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full sm:w-3/4 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-sm sm:text-md text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Add Menu"}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-green-800">{message}</p>}
      </div>
    </div>
  );
};

export default AddMenu;
