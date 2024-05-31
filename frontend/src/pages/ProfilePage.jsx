import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfilePage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    if (id && currentUser?._id !== id) {
      // Optionally fetch user data based on id
      // if not already in the state
    }
  }, [id, currentUser]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await axios.post(`http://localhost:8080/api/user/update/${currentUser?._id}`, { password }, {
        withCredentials: true,
      });
      console.log(res);
      toast.success('Password updated successfully! Please log in with your new password.');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      dispatch(updateUserSuccess(res.data));
      
      // Redirect to login page after a short delay to let the user see the success message
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
      toast.error('Error updating password');
    }
  } ;
  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen">
      <main className="flex flex-col items-center p-6">
        <section className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 my-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center font-jakarta">Profile</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 font-jakarta">Student Info</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-800 font-jakarta"><strong>Name:</strong> {currentUser?.name}</p>
              <p className="text-gray-800 font-jakarta"><strong>Email:</strong> {currentUser?.email}</p>
              <p className="text-gray-800 font-jakarta"><strong>Enrollment Number:</strong> {currentUser?.enrollmentNumber?.toUpperCase()}</p>
            </div>
          </div>
          <ul className="text-sm bg-gray-50 p-4 rounded-lg text-gray-600 mb-4 font-jakarta list-disc list-inside">
              <li>Password must be at least 8 characters long</li> 
              <li>Password must include at least one uppercase letter</li>
              <li>Password must include at least one lowercase letter, one number, and one special character.</li>
          </ul>
          <form onSubmit={handlePasswordUpdate} className="p-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 font-jakarta">Update Password</h2>
            <div className="mb-4 relative flex items-center justify-between p-2 gap-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className="shadow w-1/2 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <div
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-4 pt-5 pb-5 flex items-center text-sm leading-5 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            <div className="mb-4 relative flex gap-2 items-center justify-between p-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <div
                onClick={toggleShowConfirmPassword}
                className="absolute inset-y-0 right-0 pr-4 pt-5 pb-5 flex items-center text-sm leading-5 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20}/>}
              </div>
            </div>
            {errorMessage && (
              <div className="mb-4">
                <p className="text-red-500 text-sm font-jakarta font-bold">
                  {errorMessage}
                </p>
              </div>
            )}
            <div className='flex justify-end'>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-800 text-white rounded-2xl
                font-bold py-2 px-6 focus:outline-none focus:shadow-outline tracking-widest"
              >
                Update Password
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
