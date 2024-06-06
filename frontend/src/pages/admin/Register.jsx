import React from "react";
import { Link, NavLink } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTab, useToast } from "@chakra-ui/react";
import axios from "axios";
import Header from "../../components/Header";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [HostelID, setHostelID] = useState();
  const [HostelName, setHostelName] = useState("");
  const [role,setRole]=useState('warden');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post(
        `http://localhost:8080/api/auth/register-admin`,
        { name, email, password, role }
      );
      console.log(res);
      if (res.data.success) {
        toast({
          title: `Registered Successfully`,
          description: "Redirecting..",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login-warden");
      }
    } catch (error) {
      const msg = error.response.data.message;
      toast({
        title: `${msg}`,
        description: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
 console.log(role);
  return (
    <>
      <div className="flex flex-col h-screen bg-gradient-to-r from-gray-300 to-gray-600 min-h-screen">
        <Header/>
        <div className="flex justify-center items-center flex-1">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xl">
            <h1 className="text-3xl">Create Account</h1>
          </div>
          <form action="/register" method="post" onSubmit={handleSubmit} className="w-full flex flex-col gap-2 font-jakarta">
            <div className="flex flex-col py-4 gap-2 px-2">
            <label htmlFor="option-select" className="block mb-2">Register as</label>
          <select
             id="option-select"
             name="options"
            // value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="warden">Warden</option>
            <option value="accountant">Accountant</option>
          </select>
              <input
                className="border p-2 w-full rounded-xl focus:outline-none text-sm"
                type="email"
                name="email"
                placeholder="Enter your Email..."
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="border p-2 w-full rounded-xl focus:outline-none text-sm "
                type="password"
                name="password"
                placeholder="Enter your Password..."
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="bg-blue-500 text-white p-10 py-2 hover:bg-blue-600 rounded-2xl"
            >
              Register
            </button>
          </form>
          <div className="font-roboto">
              Already registered ? Login{" "}
              <Link to="/login-warden" className="text-blue-700 underline">
                here
              </Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default Register;
