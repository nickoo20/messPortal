// src/components/Sidebar.js
import { NavLink, useParams } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaUtensils,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const SidebarAdmin = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.admin) ;

  const { id } = useParams();
  return (
    <div className="w-64 min-h-screen flex flex-col p-4">
      <div className="flex-1 bg-gray-50 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 font-jakarta">
          Dashboard
        </h2>
        <ul className="space-y-4">
          <li className="hover:bg-gray-100 p-2">
            <NavLink
              to={`allcomplaints`}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-yellow-900 transition-colors duration-200"
                  : "flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200"
              }
            >
              <FaUser className="mr-2" />
              <span className="font-inter">All Complaints</span>
            </NavLink>
          </li>
          <li className="hover:bg-gray-100 p-2">
            <NavLink
              to="mark-leave"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-yellow-900 transition-colors duration-200"
                  : "flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200"
              }
            >
              <FaClipboardList className="mr-2" />
              <span className="font-inter">Mark Leave</span>
            </NavLink>
          </li>
          <li className="hover:bg-gray-100 p-2">
            <NavLink
              to="manage-mr"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-yellow-900 transition-colors duration-200"
                  : "flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200"
              }
            >
              <FaFileInvoiceDollar className="mr-2" />
              <span className="font-inter">Manage MR</span>
            </NavLink>
          </li>
          <li className="hover:bg-gray-100 p-2">
            <NavLink
              to="mess-menu"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-yellow-900 transition-colors duration-200"
                  : "flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200"
              }
            >
              <FaUtensils className="mr-2" />
              <span className="font-inter">Mess Menu</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
