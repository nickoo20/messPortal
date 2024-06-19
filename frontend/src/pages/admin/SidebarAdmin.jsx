import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaClipboardList, FaFileInvoiceDollar, FaUtensils, FaChevronLeft, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import { MdOutlineFoodBank } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { IoCloseSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { deleteAdminFailure, deleteAdminSuccess, signOutAdminStart } from '../../redux/admin/adminSlice';


const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("/");
  const [lastScrollY, setLastScrollY] = useState(0);
  const sidebarRef = useRef(null);
  const { id } = useParams();
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
      dispatch(deleteAdminSuccess(res?.data));
      navigate('/login-admin') ;
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
        className={`fixed top-0 right-0 h-full min-h-screen w-64 bg-gray-800 p-4 transition-transform duration-300 ease-in-out z-50 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full text-white">
          <div className="flex flex-col items-center mb-6">
            <Link to='profile'>
                <img src={currentUser?.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mb-2 object-cover" />
            </Link>
            {/* <div className='flex gap-4 items-center'> */}
            <span className="text-lg font-semibold">{currentUser?.name}</span>
            {/* <FaUserEdit size={20}/> */}
            {/* </div> */}
            <span className="text-sm text-gray-400">{currentUser?.email}</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
          <ul className="flex-1 space-y-2">
            <li className={`hover:bg-gray-700 p-2 rounded-md transition duration-200 ${selectedMenu === 'my-complaints' ? 'bg-gray-700' : ''}`} onClick={() => setSelectedMenu('my-complaints')}>
              <NavLink to={`allcomplaints`} className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-gray-100'}`
              }>
                <FaUser className="mr-2" />
                <span className="font-inter">All Complaints</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-700 p-2 rounded-md transition duration-200 ${selectedMenu === 'monthly-bills' ? 'bg-gray-700' : ''}`} onClick={() => setSelectedMenu('monthly-bills')}>
              <NavLink  to="mark-leave" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-gray-100'}`
              }>
               <FaClipboardList className="mr-2" />
               <span className="font-inter">Mark Leave</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-700 p-2 rounded-md transition duration-200 ${selectedMenu === 'mess-menu' ? 'bg-gray-700' : ''}`} onClick={() => setSelectedMenu('mess-menu')}>
              <NavLink to="manage-mr" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-gray-100'}`
              }>
                <FaFileInvoiceDollar className="mr-2" />
                <span className="font-inter">Manage MR</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-700 p-2 rounded-md transition duration-200 ${selectedMenu === 'mess-menu' ? 'bg-gray-700' : ''}`} onClick={() => setSelectedMenu('mess-menu')}>
              <NavLink to="mess-menu" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-gray-100'}`
              }>
                <FaFileInvoiceDollar className="mr-2" />
                <span className="font-inter">Mess Menu</span>
              </NavLink>
            </li>
            {/* {currentUser.studentRep && (
              <li className={`hover:bg-gray-700 p-2 rounded-md transition duration-200 ${selectedMenu === 'add-menu' ? 'bg-gray-700' : ''}`} onClick={() => setSelectedMenu('add-menu')}>
                <NavLink to="add-menu" className={({ isActive }) =>
                  `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-gray-100'}`
                }>
                  <MdOutlineFoodBank size={20} className="mr-2" />
                  <span className="font-inter">Add Menu</span>
                </NavLink>
              </li>
            )} */}
          </ul>
          <div className="mt-6">
            <div className=" p-2 flex flex-col gap-4 rounded-md transition duration-200 cursor-pointer">
              <Link to={'profile'} className="flex items-center text-gray-300 hover:text-white">
                <FaUserEdit className="mr-2" />
                <span className="font-inter">Edit your Profile</span>
              </Link>
              <div onClick={handleLogout} className="flex items-center text-gray-300 hover:text-white">
                <FaSignOutAlt className="mr-2" />
                <span className="font-inter">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSidebar ? (
        <IoCloseSharp size={25} className="absolute top-0 right-48 text-white cursor-pointer z-50" onClick={toggleSidebar} />
      ) : (
        <FaChevronRight size={30} className="fixed top-20 right-16 cursor-pointer text-gray-800 z-50" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Sidebar;
