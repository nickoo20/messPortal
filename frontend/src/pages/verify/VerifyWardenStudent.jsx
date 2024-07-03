import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner'; // Import LoadingSpinner component
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const VerifyWardenStudent = () => {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const verifyWarden = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/auth/verify-warden`, {
          params: { token }
        });
        console.log(res);
        setMessage(res.data.message);
        setIsError(false);
      } catch (error) {
        setMessage('Error verifying user.');
        setIsError(true);
        console.error('Error verifying user:', error.message);
      } finally {
        setLoading(false); // Set loading to false after request is complete
      }
    };

    if (token) {
      verifyWarden();
    } else {
      setMessage('Invalid verification link.');
      setIsError(true);
      setLoading(false); // Set loading to false if no token
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gary-50">
      <Header />
      <div className="flex justify-center items-center flex-1">
        {loading ? (
          <LoadingSpinner /> // Show spinner while loading
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <div>
              <IoCheckmarkCircleOutline size={40} className='text-green-400'/>
              </div>
            <h1 className="text-xl font-bold mb-4">Warden Verification Successfull</h1>
            <p className={`text-md ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VerifyWardenStudent;
