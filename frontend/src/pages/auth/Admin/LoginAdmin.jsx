import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAdmin,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../../redux/admin/adminSlice";
import backgroundImage from "../../../assets/background.jpg"; // Adjust the path to your background image

const LoginAdmin = () => {
  const { user } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "warden",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        "http://localhost:8080/api/admin/login-admin",
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
        setErrorMessage("Invalid credentials. Please try again.");
        dispatch(signInFailure());
        return;
      }
  
      dispatch(signInSuccess(res?.data.admin));
      // dispatch(loginAdmin()) ;
      toast({
        title: "Login Success!",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      // Move navigation logic after state updates
      setTimeout(() => {  // Use setTimeout to ensure state updates are processed
        if (user.role === "warden") {
          navigate("/admin-landing/allcomplaints");
        } else {
          navigate("/accountant-landing/allbills");
        }
      }, 0);
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Invalid Credentials!");
      dispatch(signInFailure());
    }
  };
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user) {
      if (user.role === "warden") {
        navigate("/admin-landing/allcomplaints");
      } else {
        navigate("/accountant-landing/allbills");
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-300 to-gray-600 min-h-screen">
      <Header />
      <div
        className="relative flex justify-center items-center grow flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h1 className="text-center text-xl font-semibold mb-2 text-blue-700 font-montserrat">
            Admin Login
          </h1>
          <div className="flex flex-col items-center justify-center gap-2">
            {errorMessage && (
              <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
            )}
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2 text-sm justify-center font-jakarta"
            >
              <div>Enter your account details: </div>
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
              <div className="flex items-center gap-4">
                <label htmlFor="role" className="text-sm">
                  Login as:
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData?.role}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 mb-1 rounded text-sm focus:outline-none"
                >
                  <option value="warden">Warden</option>
                  <option value="accountant">Accountant</option>
                </select>
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
