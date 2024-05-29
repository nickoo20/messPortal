import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // useEffect(() => {
    
  // }
  // }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put('http://localhost:8080/api/profile', profile);
  //     setAuth({ ...auth, user: res.data.user });
  //     toast.success('Profile updated successfully!');
  //   } catch (err) {
  //     toast.error('Error updating profile');
  //   }
  // };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await axios.put('http://localhost:8080/api/user/profile/password', { password });
      console.log(res) ; 
      toast.success('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error('Error updating password');
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen">
      <main className="flex flex-col items-center p-6">
        <section className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 my-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Profile</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">User Info</h2>
            <p className="text-gray-800"><strong>Name:</strong> {profile.name}</p>
            <p className="text-gray-800"><strong>Email:</strong> {profile.email}</p>
          </div>

          <form onSubmit={handlePasswordUpdate} className="w-full mt-8">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Password
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
