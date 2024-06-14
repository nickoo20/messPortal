import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { FaUser, FaClipboardList, FaFileInvoiceDollar, FaUtensils, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdOutlineFoodBank } from "react-icons/md";
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("/");
  const [lastScrollY, setLastScrollY] = useState(0);
  const { id } = useParams();

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="relative flex">
      {showSidebar && <div className="sidebar-backdrop fixed inset-0 bg-gray-900 opacity-50"></div>}
      <div className={`fixed h-full min-h-screen w-64 bg-gray-300 p-4 transition-transform duration-300 ease-in-out ${showSidebar ? 'transform-none' : '-translate-x-full'}`}>
        <div className="flex-1 h-full p-4 bg-gray-50 font-semibold">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 font-jakarta">Dashboard</h2>
          <ul className="space-y-2">
            <li className={`hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'my-complaints' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('my-complaints')}>
              <NavLink to={`my-complaints/${id}`} className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'}`
              }>
                <FaUser className="mr-2" />
                <span className="font-inter">My Complaints</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'all-complaints' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('all-complaints')}>
              <NavLink to="all-complaints" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'}`
              }>
                <FaClipboardList className="mr-2" />
                <span className="font-inter">All Complaints</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'monthly-bills' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('monthly-bills')}>
              <NavLink to="monthly-bills" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'}`
              }>
                <FaFileInvoiceDollar className="mr-2" />
                <span className="font-inter">Monthly Bills</span>
              </NavLink>
            </li>
            <li className={`hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'mess-menu' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('mess-menu')}>
              <NavLink to="mess-menu" className={({ isActive }) =>
                `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'}`
              }>
                <FaUtensils className="mr-2" />
                <span className="font-inter">Mess Menu</span>
              </NavLink>
            </li>
            {currentUser.studentRep && (
              <>
              <li className={`hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'add-menu' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('add-menu')}>
                <NavLink to="add-menu" className={({ isActive }) =>
                  `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'}`
                }>
                  <MdOutlineFoodBank size={20} className="mr-2" />
                  <span className="font-inter">Add Menu</span>
                </NavLink>
              </li>
              <li className={`hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'add-notice' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('add-notice')}>
                <NavLink to="add-notice" className={({ isActive }) =>
                  `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'}`
                }>
                  <MdOutlineFoodBank size={20} className="mr-2" />
                  <span className="font-inter">Add Notice</span>
                </NavLink>
              </li>
              </>
            )}
            <li className={`hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'see-notice' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('see-notice')}>
                <NavLink to="see-notice" className={({ isActive }) =>
                  `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'}`
                }>
                  <MdOutlineFoodBank size={20} className="mr-2" />
                  <span className="font-inter">See Notices</span>
                </NavLink>
              </li>
          </ul>
        </div>
      </div>
      {showSidebar ? (
        <FaChevronLeft size={28} className="absolute top-9 left-9 cursor-pointer text-gray-800" onClick={toggleSidebar} />
      ) : (
        <>
          <FaChevronRight size={30} className='absolute top-10 left-12 cursor-pointer text-gray-800' onClick={toggleSidebar}/>
        </>
      )}
    </div>
  );
};

export default Sidebar;
