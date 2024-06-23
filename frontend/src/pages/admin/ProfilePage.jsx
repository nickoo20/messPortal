import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { updateAdminFailure, updateAdminStart, updateAdminSuccess } from '../../redux/admin/adminSlice'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    // contactNumber: '',
    // hostelName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.admin) ;

  useEffect(() => {
    if (id && user?._id !== id) {
      // Optionally fetch user data based on id
      // if not already in the state
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        // contactNumber: user?.contactNumber || '',
        // hostelName: user?.hostelName || '',
      }));
    }
  }, [id, user]);

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
    const { password, confirmPassword  } = formData;

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
      dispatch(updateAdminStart());

      const updateData = {
        ...(password && { password }), // only include password if provided
        // ...(contactNumber && { contactNumber }),
        // ...(hostelName && { hostelName }),
      };

      console.log("Updating with data: ", updateData);
      const res = await axios.post(`http://localhost:8080/api/admin/update/${user?._id}`, updateData, {
        withCredentials: true,
      });

      console.log(res?.data);
      toast.success('Profile updated successfully!');
      setFormData({
        password: '',
        confirmPassword: '',
        // contactNumber: '',
        // hostelName: '',
      });
      setErrorMessage('');
      dispatch(updateAdminSuccess(res?.data));

      // Redirect to login page after a short delay if password was updated
      if (password) {
        setTimeout(() => {
          navigate('/login-admin');
        }, 2000);
      }
    } catch (err) {
      console.error("Error updating profile: ", err); // Debug: log the error
      dispatch(updateAdminFailure(err.message)) ;
      toast.error('Enter valid credentials!');
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <main className="flex flex-col items-center p-6">
        <section className="max-w-xl mx-auto bg-white shadow-md border-r-4 border-blue-300 rounded-lg p-8 my-8">
          <h1 className="text-3xl font-bold text-gray-600 mb-4 text-center font-jakarta">Profile</h1>
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-700 mb-2 font-jakarta">Student Info</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm">
              <p className="text-gray-800 font-jakarta"><strong>Name:</strong> { user?.name}</p>
              <p className="text-gray-800 font-jakarta"><strong>Email:</strong> { user?.email}</p>
              <p className="text-gray-800 font-jakarta"><strong>Hostel Name:</strong> { user?.hostelName}</p>
            </div>
          </div>
          <form onSubmit={handleUpdate} className="p-2">
            <h2 className="text-md font-semibold text-gray-700 mb-2 font-jakarta">Update Profile</h2>
            <div className="relative flex items-center justify-between p-2 gap-2">
              {/* <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label> */}
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter New Password...'
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
              {/* <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label> */}
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Enter confirm Password...'
                className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div
                onClick={toggleShowConfirmPassword}
                className="absolute inset-y-0 right-0 pr-4 pt-5 pb-5 flex items-center text-sm leading-5 cursor-pointer"
              >
                {showConfirmPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
              </div>
            </div>
            {/* <div className="flex gap-2 items-center justify-between p-2">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded text-sm w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div> */}
            {/* <div className="flex gap-2 items-center justify-between p-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Hostel Name</label>
              <select
                name="hostelName"
                value={formData.hostelName}
                onChange={handleChange}
                className="shadow appearance-none border rounded text-sm w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a Hostel</option>
                <option value="Girls Hostel">Girls Hostel</option>
                <option value="Jhelum Boys Hostel">Jhelum Boys Hostel</option>
                <option value="Manasbal Boys Hostel">Manasbal Boys Hostel</option>
                <option value="Mansar Boys Hostel">Mansar Boys Hostel</option>
                <option value="Chenab Boys Hostel">Chenab Boys Hostel</option>
                <option value="Indus Boys Hostel">Indus Boys Hostel</option>
              </select>
            </div> */}
            {errorMessage && (
              <div className="mb-4">
                <p className="text-red-500 text-sm font-jakarta font-bold">
                  {errorMessage}
                </p>
              </div>
            )}
            <div className='flex justify-end mt-3'>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold py-2 px-6 focus:outline-none focus:shadow-outline"
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
