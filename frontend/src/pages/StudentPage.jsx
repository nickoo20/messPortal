// src/pages/StudentPage.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import MainContent from "../components/MainContent";

const StudentPage = () => {
  const { currentUser } = useSelector(state=>state.user) ;

  const navigate=useNavigate() ;
  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-300 to-gray-700 min-h-screen">
      <Header />
      <div className="flex bg-gray-200">
          <Sidebar />
          {/* <MainContent/> */}
        <div className="flex-1 p-6 bg-gray-50 shadow-lg rounded-lg m-4">
          <h1 className="text-3xl ">Welcome to your Mess Portal ,  
            <span className="text-blue-700 italic font-semibold text-2xl"> {currentUser.name.toUpperCase()}</span></h1>
          <p className="text-md text-red-800 my-4 italic">Select from the sidebar .</p>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage ;
