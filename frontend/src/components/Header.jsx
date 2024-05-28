import { Link, useNavigate } from "react-router-dom";
import { NitPhoto } from "../assets/NitSrinagar_photo";
import { useAuth } from "../../context/userContext";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate() ;
  const handleClick = (e) => {
    e.preventDefault();
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    navigate("/");
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
                  <li className="hidden md:inline  hover:transition duration-900 rounded-md px-4 py-3">
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
              <div tabIndex={0} role="button" className=" m-1 text-[#003C43] font-semibold">
        {auth?.user ? <GiHamburgerMenu size={24}/> : 'Register/Login'}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {auth?.user ? (
          <>
            <li><Link to="profile">Profile</Link></li>
            <li><a href="#" onClick={handleClick}>Logout</a></li>
          </>
        ) : (
          <>
            <li><Link to="/register-student">For Students</Link></li>
            <li><Link to="/register-warden">For Wardens</Link></li>
            <li><Link to="/register-accountant">For Accountants</Link></li>
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
