import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
// import CreatePost from "../pages/CreatePost";

// src/components/MainContent.js
const MainContent = () => {
  return (
    <div className="flex-1 p-4">
      <h1 className="text-3xl font-bold mb-4 font-jakarta">Welcome to the Student Dashboard</h1>
      <p className="font-roboto text-red-600">Select an option from the sidebar to get started.</p>
      {/* <CreatePost/> */}
    </div>
  );
};

export default MainContent;
