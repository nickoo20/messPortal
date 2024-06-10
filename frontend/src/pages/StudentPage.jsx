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
    <div className="flex flex-col bg-gradient-to-r from-gray-200 to-gray-500 min-h-screen">
      <Header />
      <div className="flex from-gray-400 to-gray-700">
          <Sidebar />
          {/* <MainContent/> */}
        <div className="flex-1 p-6 bg-gray-50 shadow-lg m-4 ">
          {/* <h1 className="text-2xl my-4">Welcome to your Mess Portal ,   */}
            {/* <span className="text-green-700 italic font-semibold text-2xl"> {currentUser.name.toUpperCase()}</span> */}
          {/* </h1> */}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage ;
