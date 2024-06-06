import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    HostelName: "Girls Hostel",
    role: "warden",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // const emailRegex = /^[a-z]+_[0-9]{4}[a-z]{4}[0-9]{3}@nitsri\.ac\.in$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    let formErrors = {};

    // if (!emailRegex.test(formData.email)) {
    //   formErrors.email = "Invalid email format!";
    // }

    if (!passwordRegex.test(formData.password)) {
      formErrors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character!";
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
        "http://localhost:8080/api/auth/register-admin",
        formData,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast({
          title: "Registration Successful",
          description: res?.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login-admin");
      }
    } catch (error) {
      setErrors({ apiError: error.response?.data?.message || "Error in signup" });
      console.error("Error in signup:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-300 to-gray-600 min-h-screen">
      <Header />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xl">
          <h2 className="text-xl font-semibold font-montserrat mb-4 text-blue-700">
            Register as an Admin!
          </h2>
          <div className="flex flex-col gap-2 items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2 font-jakarta"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Full Name..."
                required
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email..."
                required
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password..."
                required
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
              <div className="flex items-center gap-4">
              <label
                htmlFor="HostelName"
                className="text-sm"
                >
                Select your Hostel :
              </label>
              <select
                id="HostelName"
                name="HostelName"
                value={formData.HostelName}
                onChange={handleChange}
                className="p-2 border border-gray-300 mb-1 rounded text-sm focus:outline-none"
                >
                <option value="Girls Hostel">Girls Hostel</option>
                <option value="Jhelum Boys Hostel">Jhelum Boys Hostel</option>
                <option value="Manasbal Boys Hostel">Manasbal Boys Hostel</option>
                <option value="Mansar Boys Hostel">Mansar Boys Hostel</option>
                <option value="Chenab Boys Hostel">Chenab Boys Hostel</option>
              </select>
              </div>
              <div className="flex items-center gap-4">
              <label
                htmlFor="role"
                className="text-sm"
                >
                Register as a ? 
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-2 border border-gray-300 mb-1 rounded text-sm focus:outline-none"
                >
                <option value="warden">Warden</option>
                <option value="accountant">Accountant</option>
              </select>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-10 py-2 hover:opacity-90 hover:bg-blue-600 rounded-xl"
                >
                  Register
                </button>
              </div>
            </form>
            {errors.apiError && (
              <p className="text-red-500 text-xs italic mt-4">
                {errors.apiError}
              </p>
            )}
            <div className="font-roboto text-center mt-2 mb-0">
              Already registered? Login{" "}
              <Link to="/login-admin" className="text-blue-700 underline">
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

export default RegisterAdmin;
