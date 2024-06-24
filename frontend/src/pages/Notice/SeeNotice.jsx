import React, {useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";
import { format } from 'date-fns'; 
import { Link } from 'react-router-dom'; 
import { IoAddCircle } from "react-icons/io5";
import LoadingSpinner from '../../components/LoadingSpinner';
import { useGetAllNotices } from '../../hooks/useGetAllNotices';
import { getRefresh } from '../../redux/notice/noticeSlice';

const SeeNotice = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { allNotices } = useSelector((state) => state.notice); 
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useGetAllNotices();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/notice/delete/${id}`, {
                withCredentials: true,
            });
            dispatch(getRefresh());
        } catch (error) {
            console.log(error);
            toast.error("An error occurred");
        }
    };

    if (loading) {
        return ( 
            <div className='flex justify-center items-center min-h-screen'>
                <LoadingSpinner />
            </div> 
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 rounded-lg">
            <div className='flex items-center justify-center gap-4 mb-6'>
                <h2 className="ml-10 md:ml-0 text-xl md:text-3xl font-semibold text-center text-blue-800 font-jakarta">Notice Board</h2>
                {currentUser?.studentRep && (
                    <Link
                        to={'/student/dashboard/add-notice'}
                        className="block text-gray-800"
                    >
                        <div className='flex text-green-700 items-center justify-center gap-2'>
                            <span className='text-sm md:text-xl font-semibold'>Add</span>
                            <IoAddCircle size={30} />
                        </div>
                    </Link>
                )}
            </div>
            <div className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allNotices?.length > 0 ? (
                        allNotices?.map((notice) => (
                            <div key={notice._id} className="flex flex-col w-full bg-white p-6 rounded-lg shadow-sm border-b-4 border-green-500">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-xs text-gray-500">{format(new Date(notice.createdAt), "PP")}</div>
                                    {currentUser?.studentRep && (
                                        <button
                                            onClick={() => handleDelete(notice._id)}
                                            className="text-gray-500 p-2 rounded-full bg-red-400 hover:bg-red-500 transition duration-200"
                                        >
                                            <AiFillDelete className='text-white' size={18} />
                                        </button>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{notice.Title}</h3>
                                <p className="flex-grow text-gray-600 mb-2">{notice.Description}</p>
                                <hr/>
                                <div className='text-sm flex flex-col xl:flex-row items-center gap-1 mt-4'>
                                    <div className='font-semibold md:border px-2 py-1 bg-green-700 text-white'>Created By:</div>
                                    <div className='flex flex-col items-center text-xs italic text-gray-500'> 
                                        <div>{notice.createdBy.email}</div>
                                        <div>( {notice.hostelName} )</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700 text-xl italic text-center col-span-full">No notices available yet....</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeeNotice;
