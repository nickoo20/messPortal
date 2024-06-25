import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../../redux/user/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import backgroundImage from "../../../assets/background.jpg"; // Adjust the path to your background image

const LoginStudent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[a-z]+_[0-9]{4}[a-z]{4}[0-9]{3}@nitsri\.ac\.in$/;

    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format!";
    }
    if (!formData.password) {
      errors.password = "Password is required!";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:8080/api/auth/login-student",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res?.data?.success === false) {
        setFormErrors({ apiError: res?.data.message });
        dispatch(signInFailure(res?.data?.message));
        return;
      }
      dispatch(signInSuccess(res?.data.user));
      toast.success(res?.data?.message);
      console.log("Login", res);
      navigate("/student/dashboard/all-complaints");
    } catch (error) {
      setFormErrors({ apiError: error.response?.data?.message || "Error in login" });
      console.error("Error:", error.message);
      dispatch(signInFailure(error.message));
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-300 to-gray-600 min-h-screen">
      <Header />
      <div className="relative flex justify-center items-center flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-700 text-center">
            Student Login 
          </h2>
          <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-700">Enter your account details: </p>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2 items-center justify-center font-jakarta"
              encType="multipart/form-data"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
              />
              {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="border p-2 w-full rounded-xl focus:outline-none text-sm"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {formErrors.password && <p className="text-red-500 text-xs italic">{formErrors.password}</p>}

              <button
                type="submit"
                className="bg-blue-500 text-white p-10 py-2 hover:bg-blue-600 rounded-2xl"
              >
                Login
              </button>
            </form>
            {formErrors.apiError && <p className="text-red-500 text-xs italic mt-4">{formErrors.apiError}</p>}
            <div className="font-roboto">
              Not verified ? Register Now{" "}
              <Link
                to={"/register-student"}
                className="text-blue-700 underline"
              >
                here
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginStudent;
