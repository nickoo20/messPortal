import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { FaUser, FaClipboardList, FaFileInvoiceDollar, FaUtensils, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("/");

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const { id } = useParams();

  return (
    <div className="relative">
      <FaChevronLeft size={showSidebar ? 24 : 34} className="absolute top-9 left-9 cursor-pointer text-gray-800" onClick={toggleSidebar} />
      {!showSidebar && (
        <span className='absolute top-10 left-20 text-xl font-mono cursor-pointer' onClick={toggleSidebar}>Back</span>
      )}
      {showSidebar && (
        <FaChevronRight size={24} className="absolute top-9 right-9 cursor-pointer text-gray-800" onClick={toggleSidebar} />
      )}
      <div className={`w-64 h-full min-h-screen flex flex-col p-4 bg-gray-200 transition-all duration-400 ease-in-out ${showSidebar ? '' : '-translate-x-full delay-200'}`}>
        <div className="flex-1 rounded-lg p-4 bg-gray-50 font-semibold">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-800 font-jakarta">Dashboard</h2>
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
              <li className={`hover:bg-gray-100 p-2 rounded-md transition duration-200 ${selectedMenu === 'add-menu' ? 'border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedMenu('add-menu')}>
                <NavLink to="add-menu" className={({ isActive }) =>
                  `flex items-center transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'}`
                }>
                  <FaUtensils className="mr-2" />
                  <span className="font-inter">Add Menu</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
