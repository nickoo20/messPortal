// src/WardenVerify.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const VerifyWardenDsw = () => {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const verifyWarden = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/warden/verify-dsw`, {
          params: { token }
        });
        console.log(res);
        setMessage(res.data.message);
        setIsError(false);
      } catch (error) {
        setMessage('Error verifying user.');
        setIsError(true);
        console.error('Error verifying user:', error.message);
      }
    };

    if (token) {
      verifyWarden();
    } else {
      setMessage('Invalid verification link.');
      setIsError(true);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-300 to-gray-600">
      <Header />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">DSW Verification !</h1>
          <p className={`text-xl ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyWardenDsw ;
