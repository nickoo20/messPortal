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
      <div className="flex m-4 from-gray-400 to-gray-700 gap-4">
          <Sidebar />
        <div className="flex-1 rounded-lg bg-gray-50">
          <Outlet />
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage ;
