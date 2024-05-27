// src/WardenVerify.js
import { useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const WardenVerify = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token') ;

    const verifyWarden = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/auth/verify-warden/`,{
          params: { token }
      }
        );
        console.log(res) ;
        setMessage(res.data.message);
      } catch (error) {
        setMessage('Error verifying user.');
        // console.error('Error verifying user:', error.message);
      }
    };

    if (token) {
      verifyWarden();
    } else {
      setMessage('Invalid verification link.');
    }
  }, [location]);

  return (
    <div>
      <h1>Warden Verification</h1>
      <p className='text-green-700 text-xl text-center'>{message}</p>
    </div>
  );
};

export default WardenVerify;
