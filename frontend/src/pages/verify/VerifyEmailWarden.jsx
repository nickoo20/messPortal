import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,Link} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


const VerifyEmailStudent = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/warden/verify-email`, {
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
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
    <Header />
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">self-email verified!</h1>
        <p className={`text-lg ${message.includes('Error') || message.includes('Invalid') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
        <p className="mt-4 text-gray-700">
          Once the DSW verifies you as a warden, you will be able to log in.
        </p>
        <p className="mt-6">
          <Link to='/' className='text-blue-600 underline'>Go to Home</Link>
        </p>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default VerifyEmailStudent;
