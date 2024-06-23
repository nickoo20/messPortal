import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";
import { format } from 'date-fns'; 
import { Link } from 'react-router-dom'; 
import { IoAddCircle } from "react-icons/io5";
import LoadingSpinner from '../../components/LoadingSpinner';
import { useGetAllNotices } from '../../hooks/useGetAllNotices' ;
import { getRefresh } from '../../redux/notice/noticeSlice';

const SeeNotice = () => {
    // const [notices, setNotice] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const { allNotices } = useSelector((state)=>state.notice) ; 
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch() ;

    // const fetchNotice = async () => {
    //     try {
    //         setLoading(true);
    //         const res = await axios.get("http://localhost:8080/api/notice", {
    //             withCredentials: true,
    //         });
    //         setLoading(false);
    //         setNotice(res.data.notices);
    //     } catch (error) {
    //         setLoading(false);
    //         console.log("Error fetching notices");
    //     }
    // };

    useGetAllNotices() ;  

    const handleDelete = async (id) => {
        try {
            // setLoading(true);
            await axios.delete(`http://localhost:8080/api/notice/delete/${id}`, {
                withCredentials: true,
            });
            dispatch(getRefresh()) ;
            // setLoading(false);
            // toast.success("Deleted successfully");
        } catch (error) {
            // setLoading(false);
            console.log(error);
            toast.error("An error occurred");
        }
    };

    // useEffect(() => { fetchNotice(); }, []);

    if (loading) {
        return ( 
            <div className='flex justify-center items-center min-h-screen'>
                <LoadingSpinner />
            </div> 
        );
    }

    return (
        <div>
            <div className='flex items-center justify-center gap-4'>
        <h2 className="text-3xl font-semibold text-center text-blue-800 font-jakarta">Notice Board</h2>
            <div className='flex items-center'>
                {currentUser?.studentRep && (
                    <Link
                    to={'/student/dashboard/add-notice'}
                    className="block text-gray-800"
                    >
                        <div className='flex text-green-700 items-center justify-center gap-2'>
                            <span className='text-xl font-semibold'>Add </span>
                            <IoAddCircle size={32} />
                        </div>
                    </Link>
                )}
                </div>
            </div>
        <div className="mt-10 bg-gray-100 min-h-screen p-6 font-inter">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {allNotices?.length > 0 ? (
                    allNotices?.map((notice) => (
                        <div key={notice._id} className="flex flex-col max-w-xs w-full mx-auto bg-white p-6 rounded-lg shadow-sm border-b-4 border-green-500 min-h-[200px]">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-xs text-gray-500">{format(new Date(notice.createdAt), "PP")}</div>
                                {currentUser?.studentRep && (
                                    <button
                                        onClick={() => handleDelete(notice._id)}
                                        className=" text-gray-500 border p-2 rounded-full bg-red-400"
                                    >
                                        <AiFillDelete className='text-white' size={12} />
                                    </button>
                                )}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{notice.Title}</h3>
                            <p className="flex-grow text-gray-600 mb-2">{notice.Description}</p>
                            <hr/>
                            <div className='text-sm flex items-center gap-1 w-full mt-4'>
                                <div className='font-semibold border px-2 py-1 bg-green-600 text-white'>CreatedBy:</div>
                                <div className='flex flex-col items-center text-xs italic text-gray-500'> 
                                <div>{notice.createdBy.email}</div>
                                <div>( {notice.hostelName} )</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700 text-xl italic  text-center">No notices available yet....</p>
                )}
            </div>
            </div>
        </div>
    );
};

export default SeeNotice;
