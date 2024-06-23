// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useSelector } from "react-redux";
import Complaint from "../components/Complaint";
import useGetMyComplaints from "../hooks/useGetMyComplaints";

const MyComplaints = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { myComplaints } = useSelector((state) => state.complaint);
  // const [complaints, setComplaints] = useState([]);
  // const [error, setError] = useState(null);
  // const id=useParams();
  useGetMyComplaints(currentUser._id);
  // useEffect(() => {
  //     const fetchComplaints = async () => {
  //         try {
  //         //   console.log(`Fetching complaints for ID: ${id}`);
  //             const response = await axios.get(`http://localhost:8080/api/complaints/my/${currentUser._id}`,{
  //               withCredentials:true,
  //             });
  //              // Debugging: Log the response
  //              console.log('API Response:', response.data);
  //             setComplaints(response?.data) ;
  //         } catch (err) {
  //                 // Debugging: Log the error
  //                 console.error('Error fetching complaints:', err);
  //                 setError('Error fetching complaints: ' + err.message);
  //         }
  //     };
  //     fetchComplaints() ;
  // }, [currentUser._id]) ;

  // if (error) {
  //     return <div>{error}</div>;
  // }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center font-jakarta">
        My Complaints
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto gap-3 bg-gray-100 p-2 min-h-screen">
        {
        myComplaints?.length > 0 ? (
          myComplaints?.map((complaint) => (
            <>
              <Complaint key={complaint._id} complaint={complaint} />
            </>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No complaints found.</p>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
