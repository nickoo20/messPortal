import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddMenu = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [menu, setMenu] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);

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
      const response = await axios.post(
        "http://localhost:8080/api/menu/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        {
          withCredentials:true,
        },
      );
      console.log(response.data) ;
      setMessage("Menu added successfully!");
    } catch (error) {
      setMessage("Failed to add menu");
    }
  };

  if(currentUser.studentRep === false){
      return <p>You do not have permission to add a menu.</p> ;
  }

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg mt-20 border-r-4 border-l-4 shadow-md">
        <h1 className="text-md sm:text-2xl mb-6 mt-0 font-roboto text-right text-blue-700">Add New Menu </h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className=" flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 flex-1 ">
            <label className="block text-gray-700 font-inter text-sm">Month:</label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              placeholder="Enter month for menu..."
              className="w-full p-2 text-sm rounded-md focus:outline-none bg-gray-50"
            />
          </div>
          <div className="flex flex-col sm:flex-row flex-1 justify-center items-center gap-1 sm:gap-4">
            <label className="block text-gray-700 font-inter text-sm">Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              placeholder="Enter year for menu..."
              className="w-full p-2 text-sm rounded-md focus:outline-none bg-gray-50"
            />
          </div>
          <div className="flex flex-col sm:flex-row flex-1 justify-between sm:gap-2 gap-1 items-center">
            <label className="block text-gray-700 font-inter text-sm">Menu:</label>
            <textarea
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              required
              placeholder="Write something..."
              className="w-full p-2 text-sm rounded-md focus:outline-none bg-gray-50"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center p-2 text-sm">
            <label className="block text-blue-700 font-jakarta">Upload PDF:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex sm:justify-end justify-center items-center">
          <button
            type="submit"
            className="font-bold bg-green-500 text-sm sm:text-md text-white px-2 sm:px-6 tracking-wider py-2 hover:opacity-85 hover:bg-green-600 rounded-full transition-colors duration-200"
            >
            Add Menu
          </button>
            </div>
        </form>
        {message && <p className="mt-4 text-center text-gray-800">{message}</p>}
      </div>
    </div>
  );
};

export default AddMenu;
