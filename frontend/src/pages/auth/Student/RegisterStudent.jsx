import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import toast from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa"; // Importing an icon from react-icons
import backgroundImage from "../../../assets/background.jpg"; // Adjust the path to your background image

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    enrollmentNumber: "",
    name: "",
    registrationNumber: "",
    role: "student",
    isVerified: false,
    isWardenVerified: false,
    hosteller: false,
    hostelName: "Girls Hostel",
    studentRep: false,
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.id === 'hosteller' || e.target.id === 'studentRep') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const emailRegex = /^[a-z]+_[0-9]{4}[a-z]{4}[0-9]{3}@nitsri\.ac\.in$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    
    let formErrors = {};

    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format!";
    }
    if (!passwordRegex.test(formData.password)) {
      formErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character!";
    }
    if (!formData.hosteller) {
      formErrors.hosteller = "Non-hosteller students cannot register!";
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register-student", formData, {
        withCredentials: true,
      });
      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data.message);
      }
    } catch (error) {
      setErrors({ apiError: error.response?.data?.message || "Error in signup" });
      console.error("Error in signup:", error.response ? error.response.data : error.message);
      // Add error handling logic here, e.g., show an error message to the user
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-300 to-gray-600 min-h-screen">
      <Header />
      <div className="relative flex justify-center items-center flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Are you a NIT Srinagar Hosteller ?{" "}
            <span className="text-green-700"> Register here</span>
          </h2>
          <div className="flex flex-col gap-2 items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2 font-jakarta"
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
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
              <input
                type="text"
                name="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={handleChange}
                placeholder="Enter your Enrollment Number"
                required
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Full Name"
                required
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
              />
              <div className="relative flex flex-wrap items-center w-full group">
                <input
                  type="number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Registration No. as 20200832 from 2020NITSGR0832"
                  required
                  className="border p-2 w-full rounded-xl focus:outline-none text-sm"
                />
                <div className="absolute top-2 right-2 flex items-center">
                  <FaInfoCircle className="mr-2 text-gray-500" />
                  <div className="text-xs text-gray-700 hidden group-hover:flex group-hover:flex-col">
                    <div>Registration Number in format:</div>
                    <div>(e.g., <span className="text-green-700">20200832</span> from <span className="text-green-700">2020</span>NITSGR<span className="text-green-700">0832</span>)</div>
                  </div>
                </div>
              </div>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter your Contact Number"
                required
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
              />
              <div className="flex flex-col items-start justify-center w-full gap-4">
                <div className="flex items-center">
                  <span>Are you a hosteller?</span>
                  <input
                    type="checkbox"
                    id="hosteller"
                    name="hosteller"
                    className="w-5 bg-[#FEFAF6]"
                    onChange={handleChange}
                    checked={formData.hosteller}
                  />
                </div>
                {errors.hosteller && (
                  <p className="text-red-500 text-xs italic">{errors.hosteller}</p>
                )}
                {formData.hosteller && (
                  <div className="flex items-center gap-4">
                    <label htmlFor="hostelName" className="text-sm">
                      Select your Hostel:
                    </label>
                    <select
                      id="hostelName"
                      name="hostelName"
                      value={formData.hostelName}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 mb-1 rounded text-sm focus:outline-none"
                    >
                      <option value="">Select a Hostel</option>
                      <option value="Girls Hostel">Girls Hostel</option>
                      <option value="Jhelum Boys Hostel">Jhelum Boys Hostel</option>
                      <option value="Manasbal Boys Hostel">Manasbal Boys Hostel</option>
                      <option value="Mansar Boys Hostel">Mansar Boys Hostel</option>
                      <option value="Chenab Boys Hostel">Chenab Boys Hostel</option>
                      <option value="Indus Boys Hostel">Indus Boys Hostel</option>
                    </select>
                  </div>
                )}
                <div className="flex items-center ">
                  <span>Are you a Mess Representative?</span>
                  <input
                    type="checkbox"
                    id="studentRep"
                    className="w-5 bg-[#FEFAF6]"
                    onChange={handleChange}
                    checked={formData.studentRep}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-10 py-2 hover:bg-blue-600 rounded-2xl"
              >
                Register
              </button>
            </form>
            {errors.apiError && <p className="text-red-500 text-xs italic mt-4">{errors.apiError}</p>}
            <div className="font-roboto">
              Already verified? Login{" "}
              <Link to="/login-student" className="text-blue-700 underline">
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

export default RegisterStudent ;
