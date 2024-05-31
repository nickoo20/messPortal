// src/pages/StudentPage.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import MainContent from "../components/MainContent";

const StudentPage = () => {
  const navigate=useNavigate() ;
 
  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
      <Header />
      <div className="flex">
          <Sidebar />
          {/* <MainContent/> */}
        <div className="flex-1 p-6 bg-white shadow-lg rounded-lg m-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage ;
