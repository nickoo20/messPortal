import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useTab, useToast } from "@chakra-ui/react";

import { useAuth } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/auth/login-admin`,
        { email, password },{
          withCredentials:true
        }
      );
       //const token=res.cookies.assess_token;
       console.log(res.data);
      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast({
          title: `Login Success!`,
          description: "Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (res.data.user.role === "warden")
        navigate("/admin-landing");
        else if(res.data.user.role==="accountant")
        navigate("/accountant-landing")
        //else if
      }
    } catch (error) {
      const msg = error.message;
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
          className="h-screen w-screen object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRG_LDH3R9yJNpCqxAfFSBz0m0LKOov8-Aw&usqp=CAU"
          alt="loginbg"
        />

        <div className="absolute w-[300px] h-[400px]  sm:w-[400px] sm:h-[430px] p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-950  text-gray-300 opacity-80">
          <div className="text-center">
            <h1 className="text-3xl font-mono mb-2">Admin Login</h1>
            <span className=" text-[17px]">
              Don't have an account?{" "}
              <NavLink className="font-bold" to="/register-warden">
                Sign Up
              </NavLink>
            </span>
          </div>
          <form
            className=""
            action="/Login"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col py-4 px-2">
              <lable className="text-lg font-mono font-bold">Email</lable>
              <input
                className="w-full  p-1.5 text-white bg-gray-700"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col py-1 px-2">
              <lable className="text-lg font-mono font-bold">Password</lable>
              <input
                className="w-full p-2 text-white bg-gray-700"
                type="password"
                name="password"
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
              className="border w-full my-5 py-3 hover:bg-zinc-950  font-bold"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
