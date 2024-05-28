// src/pages/StudentPage.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/userContext" ;

const StudentPage = () => {
  const[auth, setAuth] = useAuth() ;
  const navigate=useNavigate() ;
  if(!auth.user){
    navigate('/login-student') ;
  }
  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
      <Header />
      <div className="flex">
          <Sidebar />
        <div className="flex-1 p-6 bg-white shadow-lg rounded-lg m-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage;
