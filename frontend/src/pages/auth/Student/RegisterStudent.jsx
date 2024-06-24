import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import toast from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa";
import backgroundImage from "../../../assets/background.jpg";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
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
      formErrors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character!";
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
      const res = await axios.post(
        "http://localhost:8080/api/auth/register-student",
        formData,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data.message);
      }
    } catch (error) {
      setErrors({
        apiError: error.response?.data?.message || "Error in signup",
      });
      console.error(
        "Error in signup:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        className="flex-1 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative bg-gray-50 rounded-lg p-8 max-w-xl mx-auto my-20 md:my-32">
          <h2 className="text-xl font-semibold mb-6 text-blue-800">
            Are you a NIT Srinagar Hosteller?{" "}
            <span className="text-green-700">Register here</span>
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
                className="w-full border p-2 text-sm rounded-md focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
                className="w-full border p-2 rounded-md focus:outline-none text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="enrollmentNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Enrollment Number
              </label>
              <input
                type="text"
                id="enrollmentNumber"
                name="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={handleChange}
                placeholder="Enter your Enrollment Number"
                required
                className="w-full border p-2 rounded-md focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Full Name"
                required
                className="w-full border p-2 rounded-md focus:outline-none"
              />
            </div>

            <div className="space-y-2 relative group">
              <label
                htmlFor="registrationNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Registration Number in format: <span className="text-blue-700 font-medium">20200832</span> from <span className="text-blue-700 font-medium"> 2020</span>-NITSGR-<span className="text-blue-700 font-medium">0832</span>
              </label>
              <input
                type="number"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Registration No.:"
                required
                className="w-full border p-2 rounded-md focus:outline-none"
              />
              <div className="absolute top-8 right-2 flex items-center">
                <FaInfoCircle className="mr-2 text-gray-500" />
                <div className="text-xs text-gray-700 hidden group-hover:flex group-hover:flex-col">
                  <div>Registration Number in format:</div>
                  <div>
                    (e.g., <span className="text-green-700">20200832</span> from{" "}
                    <span className="text-green-700">2020</span>NITSGR
                    <span className="text-green-700">0832</span>)
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter your Contact Number"
                required
                className="w-full border p-2 rounded-md focus:outline-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hosteller"
                  name="hosteller"
                  className="w-5 h-5 bg-[#FEFAF6] mr-2 rounded-md"
                  onChange={handleChange}
                  checked={formData.hosteller}
                />
                <label
                  htmlFor="hosteller"
                  className="text-sm font-medium text-gray-700"
                >
                  Are you a hosteller?
                </label>
              </div>
              {errors.hosteller && (
                <p className="text-red-500 text-xs italic">{errors.hosteller}</p>
              )}
              {formData.hosteller && (
                <div className="mt-2">
                  <label
                    htmlFor="hostelName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Select your Hostel:
                  </label>
                  <select
                    id="hostelName"
                    name="hostelName"
                    value={formData.hostelName}
                    onChange={handleChange}
                    className="w-full p-2  border border-gray-300 rounded-xl focus:outline-none"
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
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Register
            </button>
          </form>
          {errors.apiError && (
            <p className="text-red-500 text-xs italic mt-4">{errors.apiError}</p>
          )}
          <div className="mt-6 text-center font-jakarta">
            Already verified? Login{" "}
            <Link to="/login-student" className="text-blue-700 underline">
              here
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterStudent;
