import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const VerifyUser = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/auth/verify-admin`,
          {
            params: { token },
          },
          { 
            withCredentials: true,
          }
        );
        console.log(res);
        setMessage(res.data.message);
      } catch (error) {
        setMessage("Error verifying user.");
        console.error("Error verifying email:", error.message);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage("Invalid verification link.");
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Admin Verification
          </h1>
          <p
            className={`text-lg ${
              message.includes("Error") || message.includes("Invalid")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
          <p className="mt-4 text-gray-700">
            You can now be able to log in to Mess Portal .
          </p>
          <p className="mt-6">
            <Link to="/" className="text-blue-600 underline">
              Go to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
