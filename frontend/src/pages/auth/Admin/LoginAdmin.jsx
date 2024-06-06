import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../../context/userContext";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../../redux/admin/adminSlice";

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:8080/api/auth/login-admin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success === false) {
        dispatch(signInFailure());
        return;
      }
      dispatch(signInSuccess(res?.data.user)) ;
      // setAuth({
      //   ...auth,
      //   user: res.data.user,
      //   token: res.data.token,
      // });
      // localStorage.setItem("auth", JSON.stringify(res.data));
      toast({
        title: "Login Success!",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      if (res?.data.user.role === "warden") {
        navigate("/admin-landing");
      } else if (res.data.user.role === "accountant") {
        navigate("/accountant-landing");
      }
    } catch (error) {
      dispatch(signInFailure()) ;  
      console.log(error.message) ;
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-300 to-gray-600 min-h-screen">
      <Header />
      <div className="flex justify-center items-center grow flex-1">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h1 className="text-xl font-mono mb-2">
            Login now (For Admins only*)
          </h1>
          <div className="flex flex-col items-center justify-center gap-2">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2 items-center justify-center font-jakarta"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  required
                  className="border p-2 w-full rounded-xl focus:outline-none text-sm"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-10 py-2 hover:bg-blue-600 hover:opacity-90 rounded-xl"
              >
                Login
              </button>
            </form>
            <div className="font-roboto mt-4">
              Not verified? Register Now{" "}
              <NavLink className="text-blue-700 underline" to="/register-admin">
                here
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginAdmin;
