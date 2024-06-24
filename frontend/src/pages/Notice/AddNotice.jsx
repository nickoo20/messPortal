import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { getRefresh } from '../../redux/notice/noticeSlice';
import { useDispatch } from 'react-redux';

const NoticeForm = () => {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/notice', {
        Title,
        Description
      }, {
        withCredentials: true
      });
      dispatch(getRefresh());
      navigate('/student/dashboard/see-notice');
      toast.success("Notice added successfully");
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('There was an error adding the notice!', error);
      toast.error('Error adding notice. Please try again.');
    }
  };

  return (
    <div className="mt-10 min-h-screen px-4 sm:px-6 lg:px-8">
      <button className="flex items-center mb-6" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack size={30} className="mr-2" />
        <span className="italic text-blue-700">Go Back to All Notices</span>
      </button>
      <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-sm border-green-500 border-r-4">
        <h2 className="text-sm sm:text-md md:text-xl xl:text-2xl font-bold font-jakarta text-green-700 mb-6 text-center">Add a new Notice</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              name="title"
              className="shadow text-sm appearance-none border font-inter rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='Enter title of the notice...'
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              name="description"
              rows="4"
              className="shadow text-sm appearance-none font-inter border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='Enter description for the notice...'
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white rounded-2xl
    font-bold py-2 px-4 sm:px-6 md:px-8 focus:outline-none focus:shadow-outline tracking-widest w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeForm;
