import React from "react";
<<<<<<< HEAD
import { Link, NavLink } from "react-router-dom";
=======
import { NavLink } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTab, useToast } from "@chakra-ui/react";
import axios from "axios";

const RegisterWarden = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [HostelID, setHostelID] = useState();
  const [HostelName, setHostelName] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/auth/register-admin`,
        { name, email, password, HostelID, HostelName }
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
        navigate("/login");
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

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <img
          className="h-screen w-screen object-cover "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRG_LDH3R9yJNpCqxAfFSBz0m0LKOov8-Aw&usqp=CAU"
          alt="loginbg"
        />

        <div className="absolute w-[300px] h-[450px]  sm:w-[400px] sm:h-[540px] p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-950  text-white opacity-80">
          <div className="text-center">
            <h1 className="text-3xl">Create Account</h1>
            <span className="  text-[17px]">
              Already have an account?{" "}
              <NavLink className="font-bold" to="/login-warden">
                Sign In
              </NavLink>
            </span>
          </div>
          <form action="/register" method="post" onSubmit={handleSubmit}>
            <div className="flex flex-col py-4 gap-2 px-2">
              <input
                className="p-2 text-lg font-mono font-bold bg-pink-950"
                type="text"
                name="username"
                id="username"
                placeholder="UserName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="p-2 text-lg font-mono font-bold bg-pink-950"
                type="number"
                name="studentid"
                id="studentid"
                placeholder="Hostel ID"
                value={HostelID}
                onChange={(e) => setHostelID(e.target.value)}
                required
              />

              <input
                className="p-2 text-lg font-mono font-bold bg-pink-950"
                type="text"
                name="Hostel"
                id="Hostel"
                placeholder="Hostel Name"
                value={HostelName}
                onChange={(e) => setHostelName(e.target.value)}
                required
              />

              <input
                className="p-1.5 text-lg font-mono font-bold bg-pink-950"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="w-full p-2 text-lg font-mono font-bold h-[35px] bg-pink-950 "
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="flex ml-2 items-center">
              <input className="mr-2" type="checkbox" />
              Remember me
            </p>
            <button
              className="border-2 w-full my-5 py-4 hover:bg-zinc-950  font-bold"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
>>>>>>> d06c04a85e27f4d60f0491134fc3eb445724f74b

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTab, useToast } from "@chakra-ui/react";
import axios from "axios";
import Header from "../../../components/Header";

const RegisterWarden = () => {
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

export default RegisterWarden;
