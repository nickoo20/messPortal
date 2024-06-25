import { Link, useNavigate } from "react-router-dom";
import { NitPhoto } from "../assets/NitSrinagar_photo";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { signOutUserStart, deleteUserFailure, deleteUserSuccess } from '../redux/user/userSlice';
import { deleteAdminFailure, deleteAdminSuccess, signOutAdminStart } from "../redux/admin/adminSlice";
import toast from "react-hot-toast";

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const { user } = useSelector(state => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutStudent = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.post('http://localhost:8080/api/auth/logout-student', {}, {
        withCredentials: true,
      });
      if (res?.data.success === false) {
        dispatch(deleteUserFailure(res?.data.message));
        return;
      }
      toast.success(res?.data.message);
      dispatch(deleteUserSuccess(res?.data));
      navigate('/login-student');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.log(error.message);
    }
  };

  const handleLogoutAdmin = async () => {
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
      navigate('/login-admin');
    } catch (error) {
      dispatch(deleteAdminFailure(error.message));
      console.log(error.message);
    }
  };

  return (
    <div>
      <header className="bg-[#F6F5F2] shadow-md pt-2 w-full">
        <div className="flex items-center justify-between px-4 py-2 sm:pl-12 gap-3 mr-4">
          <Link to="/" className="flex gap-2 items-center">
            <div className="hidden sm:block border-2 rounded-full"><NitPhoto /></div>
            <div className="flex flex-col items-center ">
              <h1 className="text-sm sm:text-sm font-jakarta flex border-none rounded-full tracking-wide mb-0 ">
                MESS COMPLAINT PORTAL
              </h1>
              <div className="text-xs font-bold text-blue-500">(NIT Srinagar)</div>
            </div>
          </Link>
          <div className="">
            <div className="flex justify-end items-center gap-2">
              <ul className="flex items-center text-[#003C43] font-semibold md:ml-20 text-md">
                <Link to="/">
                  <li className="hidden md:inline hover:transition duration-900 rounded-md px-4 py-3">
                    Home
                  </li>
                </Link>
                <Link to="/about-us">
                  <li className="hidden md:inline hover:transition duration-900 rounded-md px-2 py-3 ">
                    About us
                  </li>
                </Link>
              </ul>
              {!currentUser?._id && !user?._id && (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="m-1 text-[#003C43] font-semibold text-sm sm:text-md">
                    <GiHamburgerMenu size={24} />
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box md:w-52 w-28">
                    <li><Link to="/login-student">For Students</Link></li>
                    <li><Link to="/login-admin">For Admins</Link></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;