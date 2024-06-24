import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaClipboardList, FaFileInvoiceDollar, FaUtensils, FaSignOutAlt, FaChevronRight, FaChevronLeft, FaUserEdit, FaBookmark } from 'react-icons/fa';
import { MdOutlineFoodBank } from "react-icons/md";
import { PiNotepadFill, PiNotePencil } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showSidebar, setShowSidebar] = useState(false);
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
      dispatch(signOutUserStart());
      const res = await axios.post('http://localhost:8080/api/auth/logout', {}, {
        withCredentials: true,
      });
      if (res?.data.success === false) {
        dispatch(deleteUserFailure(res?.data.message));
        return;
      }
      localStorage.removeItem('bill');
      toast.success(res?.data.message);
      dispatch(deleteUserSuccess(res?.data));
      navigate('/login-student');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.log(error.message);
    }
  };

  return (
    <div className="relative flex">
    {showSidebar && (
      <div className="fixed inset-0 bg-gray-700 opacity-50 z-40" onClick={toggleSidebar}></div>
    )}
    <div
      ref={sidebarRef}
      className={`fixed top-30 left-0 h-full w-72 bg-white rounded-lg p-4 transition-transform duration-300 ease-in-out z-50 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <FaBookmark size={20} className='absolute text-blue-500 right-8 top-0'/>
      <div className="flex flex-col h-full gap-3 p-2">
        <div className="flex flex-col items-center">
          <div className='flex items-center gap-2'>
            <Link to='profile'>
            <div className='border-2 border-blue-500 rounded-full overflow-hidden h-10 w-10'>
              <img src={currentUser?.profilePicture} alt="Profile" className="object-cover h-full w-full" />
            </div>
            </Link>
            <div className='flex flex-col items-center'>
              <span className="text-sm text-blue-800 font-semibold">{currentUser.name}</span>
              <span className="text-xs text-gray-500 italic font-semibold">{currentUser.hostelName}</span>
            </div>
          </div>
          <hr/>
        </div>
        <h2 className="text-xl text-blue-500 font-bold mt-2 text-center">Dashboard</h2>
        <hr/>
        <ul className="space-y-2">
          <li className={`text-sm p-2 rounded-md transition duration-200 ${selectedMenu === 'my-complaints' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('my-complaints')}>
            <NavLink to={`my-complaints/${id}`} className={({ isActive }) =>
              `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
            }>
              <FaUser className="mr-2" />
              <span className="font-inter ">My Complaints</span>
            </NavLink>
          </li>
          <li className={`text-sm p-2 rounded-md transition duration-200 ${selectedMenu === 'all-complaints' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('all-complaints')}>
            <NavLink to="all-complaints" className={({ isActive }) =>
              `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
            }>
              <FaClipboardList className="mr-2" />
              <span className="font-inter">All Complaints</span>
            </NavLink>
          </li>
          <li className={`text-sm p-2 rounded-md transition duration-200 ${selectedMenu === 'see-notice' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('see-notice')}>
            <NavLink to="see-notice" className={({ isActive }) =>
              `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
            }>
              <PiNotepadFill size={20} className="mr-2" />
              <span className="font-inter">See Notices</span>
            </NavLink>
          </li>
          <li className={`text-sm p-2 rounded-md transition duration-200 ${selectedMenu === 'monthly-bills' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('monthly-bills')}>
            <NavLink to="monthly-bills" className={({ isActive }) =>
              `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
            }>
              <FaFileInvoiceDollar className="mr-2" />
              <span className="font-inter">Monthly Bills</span>
            </NavLink>
          </li>
          <li className={`text-sm p-2 rounded-md transition duration-200 ${selectedMenu === 'mess-menu' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('mess-menu')}>
            <NavLink to="mess-menu" className={({ isActive }) =>
              `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
            }>
              <FaUtensils className="mr-2" />
              <span className="font-inter">Mess Menu</span>
            </NavLink>
          </li>
          <hr/>
          {currentUser.studentRep && (
            <>
              <li className={`text-sm p-2 rounded-md transition duration-200 ${selectedMenu === 'add-menu' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('add-menu')}>
                <NavLink to="add-menu" className={({ isActive }) =>
                  `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
                }>
                  <MdOutlineFoodBank size={20} className="mr-2" />
                  <span className="font-inter">Add Menu</span>
                </NavLink>
              </li>
              <li className={`text-sm p-2 rounded-md transition duration-200 ${selectedMenu === 'add-notice' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('add-notice')}>
                <NavLink to="add-notice" className={({ isActive }) =>
                  `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
                }>
                  <PiNotePencil size={20} className="mr-2" />
                  <span className="font-inter">Add Notice</span>
                </NavLink>
              </li>
              <hr/>
            </>
          )}
        </ul>
          <div className="flex flex-col gap-3">
            <Link to={'profile'} className="flex text-sm items-center text-gray-700 mt-2">
              <FaUserEdit className="mr-2" />
              <span className="font-inter">Edit your Profile</span>
            </Link>
            <div onClick={handleLogout} className="flex text-sm items-center text-gray-700 mt-2 cursor-pointer">
              <RiLogoutCircleLine size={20} className="mr-2 text-red-500" />
              <span className="font-inter">Logout</span>
            </div>
          </div>
        </div>
      </div>
      {showSidebar ? (
        <div className='bg-gray-300 border-blue-500 border-2 p-1 rounded-lg absolute top-2 left-4 cursor-pointer z-50'>
          <FaChevronLeft size={20} onClick={toggleSidebar} />
        </div>
      ) : (
        <div className='bg-gray-300 border-blue-500 border-2 p-1 rounded-lg absolute top-2 left-4 cursor-pointer z-50'>
          <FaChevronRight size={20} onClick={toggleSidebar} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
