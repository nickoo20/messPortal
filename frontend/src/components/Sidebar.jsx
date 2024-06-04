// src/components/Sidebar.js
import { NavLink, useParams } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaUtensils,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  return (
    <div className="w-64 min-h-screen flex flex-col p-4">
      <div className="flex-1 bg-white rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 font-jakarta">
          Dashboard
        </h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to={`my-complaints/${id}`}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-yellow-900 border-b-2 transition-colors duration-200"
                  : "flex items-center text-blue-700 border-b-2 hover:text-blue-900 transition-colors duration-200"
              }
            >
              <FaUser className="mr-2" />
              <span className="font-inter">My Complaints</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="all-complaints"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-yellow-900 border-b-2 transition-colors duration-200"
                  : "flex items-center text-blue-700 border-b-2 hover:text-blue-900 transition-colors duration-200"
              }
            >
              <FaClipboardList className="mr-2" />
              <span className="font-inter">All Complaints</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="monthly-bills"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-yellow-900 border-b-2 transition-colors duration-200"
                  : "flex items-center text-blue-700 border-b-2 hover:text-blue-900 transition-colors duration-200"
              }
            >
              <FaFileInvoiceDollar className="mr-2" />
              <span className="font-inter">Monthly Bills</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="mess-menu"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-yellow-900 border-b-2 transition-colors duration-200"
                  : "flex items-center text-blue-700 border-b-2 hover:text-blue-900 transition-colors duration-200"
              }
            >
              <FaUtensils className="mr-2" />
              <span className="font-inter">Mess Menu</span>
            </NavLink>
          </li>
          {currentUser.studentRep && (
            <li>
              <NavLink
                to="add-menu"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-yellow-900 border-b-2 transition-colors duration-200"
                    : "flex items-center text-blue-700 border-b-2 hover:text-blue-900 transition-colors duration-200"
                }
              >
                <FaUtensils className="mr-2" />
                <span className="font-inter">Add Menu</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
