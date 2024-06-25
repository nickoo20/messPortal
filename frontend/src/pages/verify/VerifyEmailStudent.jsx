import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const VerifyEmailStudent = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // State to manage loading
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/auth/verify-email`, {
          params: { token },
        });
        console.log(res);
        setMessage(res.data.message);
      } catch (error) {
        setMessage('Error verifying user.');
        console.error('Error verifying email:', error.message);
      } finally {
        setLoading(false); // Set loading to false after request is complete
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage('Invalid verification link.');
      setLoading(false); // Set loading to false if no token
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex justify-center items-center flex-1">
        {loading ? (
          <LoadingSpinner /> // Show spinner while loading
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center">
            <div><IoCheckmarkCircleOutline size={50} className='text-green-400' /></div>
            <p className={`text-md ${message.includes('Error') || message.includes('Invalid') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
            <p className="text-gray-700">
              Once the Warden verifies you as a hosteller, you will be able to log in to the Mess Portal.
            </p>
            <p className="mt-6">
              <Link to='/' className='text-blue-500 underline'>Go to Home</Link>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmailStudent;
