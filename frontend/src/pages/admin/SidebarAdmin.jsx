import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaClipboardList, FaFileInvoiceDollar, FaUtensils, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { deleteAdminFailure, deleteAdminSuccess, logoutAdmin, signOutAdminStart } from '../../redux/admin/adminSlice';

const SidebarAdmin = () => {
  const { user } = useSelector((state) => state.admin);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("/");
  const [lastScrollY, setLastScrollY] = useState(0);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowSidebar(false);
      }

      setLastScrollY(currentScrollY);
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      dispatch(signOutAdminStart());
      const res = await axios.post('http://localhost:8080/api/auth/logout', {}, {
        withCredentials: true,
      });
      if (res?.data.success === false) {
        dispatch(deleteAdminFailure(res?.data.message));
        return;
      }
      toast.success(res?.data.message);
      dispatch(logoutAdmin()) ;
      dispatch(deleteAdminSuccess(res?.data));
      navigate('/login-admin');
    } catch (error) {
      dispatch(deleteAdminFailure(error.message));
      console.log(error.message);
    }
  };

  return (
    <div className="relative flex">
      {showSidebar && <div className="fixed inset-0 bg-gray-600 opacity-50 z-40" onClick={toggleSidebar}></div>}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full min-h-screen w-72 bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out z-50 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full text-gray-800">
          <div className="flex flex-col items-center mb-8">
            <Link to="/admin-landing/profile">
              <img src={user?.profilePicture} alt="Profile" className="border-4 border-blue-500 w-16 h-16 rounded-full mb-3 object-cover shadow-md" />
            </Link>
            <span className="text-lg font-semibold">{user?.name}</span>
            <span className="text-sm text-gray-600 italic">{user?.email}</span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-center">Dashboard</h2>
          <ul className="text-sm">
            <li className={`hover:bg-gray-100 p-3 rounded-lg transition duration-200 ${selectedMenu === 'all-complaints' ? 'bg-gray-50 border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('all-complaints')}>
              <NavLink to="allcomplaints" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
              }>
                <FaUser className="mr-2" />
                <span className="font-inter">All Complaints</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-100 p-3 rounded-lg transition duration-200 ${selectedMenu === 'mark-leave' ? 'bg-gray-50 border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('mark-leave')}>
              <NavLink to="mark-leave" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500 ' : 'text-gray-800'}`
              }>
                <FaClipboardList className="mr-2" />
                <span className="font-inter">Register Student Leave</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-100 p-3 rounded-lg transition duration-200 ${selectedMenu === 'manage-mr' ? 'bg-gray-50 border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('manage-mr')}>
              <NavLink to="manage-mr" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
              }>
                <FaFileInvoiceDollar className="mr-2" />
                <span className="font-inter">Manage MR</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-100 p-3 rounded-lg transition duration-200 ${selectedMenu === 'mess-menu' ? 'bg-gray-50 border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('mess-menu')}>
              <NavLink to="mess-menu" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
              }>
                <FaUtensils className="mr-2" />
                <span className="font-inter">Mess Menu</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-100 p-3 rounded-lg transition duration-200 ${selectedMenu === 'all-students' ? 'bg-gray-50 border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('all-students')}>
              <NavLink to="all-students" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
              }>
                <FaUtensils className="mr-2" />
                <span className="font-inter">Students List</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-100 p-3 rounded-lg transition duration-200 ${selectedMenu === 'toggle-hostelChange' ? 'bg-gray-50 border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('toggle-hostelChange')}>
              <NavLink to="toggle-hostelChange" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
              }>
                <FaUtensils className="mr-2" />
                <span className="font-inter">Hostel Enable </span>
              </NavLink>
            </li>
          </ul>
          <div className="mt-8 border-t pt-4">
            <div className="text-sm flex flex-col gap-4">
              <Link to="/admin-landing/profile" className="flex items-center text-gray-800 hover:text-blue-500">
                <FaUserEdit className="mr-2" />
                <span className="font-inter">Edit your Profile</span>
              </Link>
              <div onClick={handleLogout} className="flex items-center text-gray-800 hover:text-blue-500 cursor-pointer">
                <FaSignOutAlt className="mr-2" />
                <span className="font-inter">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSidebar ? (
        <IoCloseSharp size={25} className="absolute top-4 right-76 text-gray-800 cursor-pointer z-50" onClick={toggleSidebar} />
      ) : (
        <FaChevronRight size={30} className="fixed top-20 right-16 cursor-pointer text-gray-800 z-50" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default SidebarAdmin;
