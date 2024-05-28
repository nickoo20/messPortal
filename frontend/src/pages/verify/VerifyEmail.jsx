import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/auth/verify-email`, {
          params: { token }
        });
        console.log(res);
        setMessage(res.data.message);
      } catch (error) {
        setMessage('Error verifying user.');
        console.error('Error verifying email:', error.message);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage('Invalid verification link.');
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-300 to-gray-600">
      <Header />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
          <p className={`text-xl ${message.includes('Error') || message.includes('Invalid') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
