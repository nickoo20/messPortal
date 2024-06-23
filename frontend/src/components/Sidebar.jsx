import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaClipboardList, FaFileInvoiceDollar, FaUtensils, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import { MdOutlineFoodBank } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { IoCloseSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { PiNotepadFill,PiNotePencil } from "react-icons/pi";

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
      dispatch(signOutUserStart());
      const res = await axios.post('http://localhost:8080/api/auth/logout', {}, {
        withCredentials: true,
      });
      if (res?.data.success === false) {
        dispatch(deleteUserFailure(res?.data.message));
        return;
      }
      localStorage.removeItem('bill') ;
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
      {showSidebar && <div className="fixed inset-0 bg-gray-700 opacity-50 z-40" onClick={toggleSidebar}></div>}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 min-h-screen w-72 shadow-lg rounded-lg bg-white p-4 transition-transform duration-300 ease-in-out z-50 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center mb-6">
            <Link to='/profile'>
              <img src={currentUser?.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mb-2 object-cover" />
            </Link>
            <span className="text-sm font-semibold">{currentUser.name}</span>
            <span className="text-xs italic text-gray-600">{currentUser.email}</span>
          </div>
          <h2 className="text-xl font-bold mb-4 text-center">Dashboard</h2>
          <hr/>
          <ul className="flex-1 space-y-2">
            <li className={`text-sm hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'my-complaints' ? 'bg-gray-50' : ''}`} onClick={() => setSelectedMenu('my-complaints')}>
              <NavLink to={`my-complaints/${id}`} className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800 hover:bg-gray-100'}`
              }>
                <FaUser className="mr-2" />
                <span className="font-inter">My Complaints</span>
              </NavLink>
            </li>
            <li className={`text-sm hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'all-complaints' ? 'bg-gray-50' : ''}`} onClick={() => setSelectedMenu('all-complaints')}>
              <NavLink to="all-complaints" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
              }>
                <FaClipboardList className="mr-2" />
                <span className="font-inter">All Complaints</span>
              </NavLink>
            </li>
            <li className={`text-sm hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'see-notice' ? 'bg-gray-50' : ''}`} onClick={() => setSelectedMenu('see-notice')}>
              <NavLink to="see-notice" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
              }>
                <PiNotepadFill size={20} className="mr-2" />
                <span className="font-inter">See Notices</span>
              </NavLink>
            </li>
            <li className={`text-sm hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'monthly-bills' ? 'bg-gray-50' : ''}`} onClick={() => setSelectedMenu('monthly-bills')}>
              <NavLink to="monthly-bills" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800 '}`
              }>
                <FaFileInvoiceDollar className="mr-2" />
                <span className="font-inter">Monthly Bills</span>
              </NavLink>
            </li>
            <li className={`text-sm hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'mess-menu' ? 'bg-gray-50' : ''}`} onClick={() => setSelectedMenu('mess-menu')}>
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
                <li className={`text-sm hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'add-menu' ? 'bg-gray-50' : ''}`} onClick={() => setSelectedMenu('add-menu')}>
                  <NavLink to="add-menu" className={({ isActive }) =>
                    `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
                  }>
                    <MdOutlineFoodBank size={20} className="mr-2" />
                    <span className="font-inter">Add Menu</span>
                  </NavLink>
                </li>
                <li className={`text-sm hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'add-notice' ? 'bg-gray-50' : ''}`} onClick={() => setSelectedMenu('add-notice')}>
                  <NavLink to="add-notice" className={({ isActive }) =>
                    `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-800'}`
                  }>
                    <PiNotePencil size={20} className="mr-2" />
                    <span className="font-inter">Add Notice</span>
                  </NavLink>
                </li>
              </>
            )}
           
          </ul>
          <div className="mt-auto">
            <div className="p-2 flex flex-col gap-4 rounded-md transition duration-200 cursor-pointer">
              <hr/>
              <Link to={'profile'} className="flex text-sm items-center text-gray-700">
                <FaUserEdit className="mr-2" />
                <span className="font-inter">Edit your Profile</span>
              </Link>
              <div onClick={handleLogout} className="text-sm flex items-center text-gray-700">
                <FaSignOutAlt className="mr-2" />
                <span className="font-inter">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSidebar ? (
        <div className='bg-gray-300 border-blue-500 border-2 p-1 rounded-lg absolute top-2 right-6 cursor-pointer z-50'>
          <IoCloseSharp size={22} onClick={toggleSidebar} />
        </div>
      ) : (
        <FaChevronRight size={30} className="fixed top-20 right-6 cursor-pointer text-gray-800 z-50" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Sidebar;
