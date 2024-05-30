import { Link, useNavigate } from "react-router-dom";
import { NitPhoto } from "../assets/NitSrinagar_photo";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { signOutUserStart, deleteUserFailure, deleteUserSuccess } from '../redux/user/userSlice';
import toast from "react-hot-toast";

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.post('http://localhost:8080/api/auth/logout-student', {
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
      console.log(error.message) ;
    }
  };

  return (
    <div>
      <header className="bg-[#F6F5F2] shadow-md pt-2 w-full">
        <div className="flex items-center justify-between px-4 py-2 sm:pl-12 gap-3 mr-4">
          <Link to="/" className="flex items-center">
            <NitPhoto />
            <h1 className="text-sm xl:text-xl flex border-none rounded-full p-2 tracking-wide font-inter">
              MESS PORTAL - NIT SRINAGAR
            </h1>
          </Link>
          <div className="">
            <div className="flex justify-end items-center gap-2">
              <ul className="flex items-center text-[#003C43] font-semibold md:ml-20 ">
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
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1 text-[#003C43] font-semibold">
                  {currentUser?._id ? <GiHamburgerMenu size={24} /> : 'Register/Login'}
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  {currentUser?._id ? (
                    <>
                      <li><Link to="profile">Profile</Link></li>
                      <li onClick={handleLogout}><a href="#">Logout</a></li>
                    </>
                  ) : (
                    <>
                      <li><Link to="/login-student">For Students</Link></li>
                      <li><Link to="/login-warden">For Wardens</Link></li>
                      <li><Link to="/login-accountant">For Accountants</Link></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
