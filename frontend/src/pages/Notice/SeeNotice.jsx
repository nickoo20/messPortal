import react from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const SeeNotice=()=>{
    const [notices,setnotice]=useState('');
   const { currentUser } = useSelector((state) => state.user);

       const fetchNotice=async()=>{
           try {
               const res=await axios.get("http://localhost:8080/api/notice",{
                   withCredentials:true
               });
                console.log(currentUser);
                //console.log(res)
               setnotice(res.data.notices);
               
           } catch (error) {
               console.log("error fetching notices");
           }
       }
       const handleDelete=async(id)=>{
         try {
           console.log(id);
           const res=await axios.delete(`http://localhost:8080/api/notice/delete/${id}`,{
             withCredentials:true
           });
           fetchNotice();
           toast.success("Deleted successfully");
         } catch (error) {
           console.log(error);
           toast.error("An error occurred");
         }
       }
       useEffect(()=>{fetchNotice()},[]);
    return (
<div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Notices</h2>
      <div className="space-y-4">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div key={notice._id} className="max-w-md mx-auto bg-white p-5 rounded shadow-lg">
              <h3 className="text-xl font-bold mb-2">{notice.Title}</h3>
              <p className="text-gray-700">{notice.Description}</p>
              {currentUser?.studentRep && (
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>
            
          ))
        ) : (
          <p className="text-gray-700 text-center">No notices available</p>
        )
        
        }
      </div>
    </div>
    )
}
export default SeeNotice;