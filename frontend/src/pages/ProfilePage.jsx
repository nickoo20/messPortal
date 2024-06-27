import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    contactNumber: '',
    hostelName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user data if the current user is not the same as the profile being viewed
    if (id && currentUser?._id !== id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/${id}`, {
            withCredentials: true,
          });
          setFormData({
            contactNumber: response.data.contactNumber || '',
            hostelName: response.data.hostelName || '',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    } else {
      setFormData({
        contactNumber: currentUser?.contactNumber || '',
        hostelName: currentUser?.hostelName || '',
      });
    }
  }, [id, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, contactNumber, hostelName } = formData;

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password && !passwordRegex.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    try {
      dispatch(updateUserStart());

      const updateData = {
        ...(password && { password }),
        ...(contactNumber && { contactNumber }),
        ...(hostelName && { hostelName }),
      };

      const response = await axios.post(`http://localhost:8080/api/user/update/${currentUser?._id}`, updateData, {
        withCredentials: true,
      });
      console.log(response)
      if (response.statusText === "OK") {
        toast.success('Profile updated successfully!');
        setFormData({
          password: '',
          confirmPassword: '',
          contactNumber: '',
          hostelName: '',
        });
        setErrorMessage('');
        dispatch(updateUserSuccess(response.data));

        // Redirect to login page after a short delay if password was updated
        if (password) {
          setTimeout(() => {
            navigate('/login-student');
          }, 2000);
        }
      } else {
        setErrorMessage(response.data.message || 'Failed to update profile.');
        dispatch(updateUserFailure(response.data.message || 'Failed to update profile.'));
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setErrorMessage('Failed to update profile. Please try again.');
      dispatch(updateUserFailure(err.message));
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <main className="flex flex-col items-center p-6">
        <section className="max-w-xl mx-auto bg-white shadow-md border-r-4 border-blue-300 rounded-lg p-8 my-8 w-full md:w-3/4 lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-600 mb-4 text-center">Profile</h1>
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-700 mb-2">Student Info</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm">
              <p className="text-gray-800"><strong>Name:</strong> {currentUser?.name}</p>
              <p className="text-gray-800"><strong>Email:</strong> {currentUser?.email}</p>
              <p className="text-gray-800"><strong>Enrollment Number:</strong> {currentUser?.enrollmentNumber?.toUpperCase()}</p>
            </div>
          </div>
          <form onSubmit={handleUpdate} className="p-2">
            <h2 className="text-md font-semibold text-gray-700 mb-2">Update Profile</h2>
            <div className="relative flex items-center justify-between p-2 gap-2">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter New Password..."
                className="shadow w-full appearance-none border text-sm rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-4 pt-5 pb-5 flex items-center text-sm leading-5 cursor-pointer"
              >
                {showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
              </div>
            </div>
            <div className="mb-4 relative flex gap-2 items-center justify-between p-2">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter Confirm Password..."
                className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div
                onClick={toggleShowConfirmPassword}
                className="absolute inset-y-0 right-0 pr-4 pt-5 pb-5 flex items-center text-sm leading-5 cursor-pointer"
              >
                {showConfirmPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
              </div>
            </div>
            <div className="flex gap-2 items-center justify-between p-2">
              <label htmlFor="contactNumber" className="block text-gray-700 text-sm font-medium mb-2">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter Contact Number..."
                className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex gap-2 items-center justify-between p-2">
              <label htmlFor="hostelName" className="block text-gray-700 text-sm font-medium mb-2">Hostel Name</label>
              <select
                id="hostelName"
                name="hostelName"
                value={formData.hostelName}
                onChange={handleChange}
                className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a Hostel</option>
                <option value="Girls Hostel">Girls Hostel</option>
                <option value="Jhelum Boys Hostel">Jhelum Boys Hostel</option>
                <option value="Manasbal Boys Hostel">Manasbal Boys Hostel</option>
                <option value="Mansar Boys Hostel">Mansar Boys Hostel</option>
                <option value="Chenab Boys Hostel">Chenab Boys Hostel</option>
                <option value="Indus Boys Hostel">Indus Boys Hostel</option>
              </select>
            </div>
            {errorMessage && (
              <div className="mb-4">
                <p className="text-red-500 text-sm font-bold">{errorMessage}</p>
              </div>
            )}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold py-2 px-6 focus:outline-none focus:shadow-outline w-full md:w-auto"
              >
                Update
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
