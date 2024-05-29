import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../../redux/user/userSlice";

const LoginStudent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {loading, error} = useSelector((state) => state.user) ;
  const navigate = useNavigate();
  const dispatch =useDispatch() ;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart()) ;
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
      if(res?.data?.success === false){
        dispatch(signInFailure(res?.data?.message)) ;
        return ; 
      }
        dispatch(signInSuccess(res?.data.user)) ;
        toast.success(res?.data?.message);
        console.log("Login", res);
        // localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/student/dashboard");
      // Add success message or redirection logic here
    } catch (error) {
      console.error("Error:", error.message);
      dispatch(signInFailure(error.message)) ;
      // Add error handling logic here
    }
  };

  return (
    <div className="flex flex-col  bg-gradient-to-r from-gray-300 to-gray-600 min-h-screen">
      <Header />
      <div className="flex justify-center items-center grow flex-1">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 font-montserrat">
            Login now <span className="text-red-700"> (Hostellers only*)</span>
          </h2>
          <div className="flex flex-col items-center justify-center gap-2">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2 items-center justify-center"
              encType="multipart/form-data"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
                className="border p-2 w-full rounded-xl focus:outline-none"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
                className="border p-2 w-full rounded-xl focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-10 py-2 hover:bg-blue-600 rounded-2xl"
              >
                Login
              </button>
            </form>
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
