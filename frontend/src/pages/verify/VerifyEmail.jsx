import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// import dotenv from 'dotenv'; 

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
        setMessage('Error verifying user.') ;
        console.error('Error verifying email:', error.message) ;
      }
    };

    if (token) {
      verifyEmail();
    }
    else{
      setMessage('Invalid verification link.');
    }
  }, [location]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p className='text-blue-700 text-xl text-center'>{message}</p>
    </div>
  );
};

export default VerifyEmail;
