import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Complaint from '../components/Complaint';

const MyComplaints = () => {
    const {currentUser} = useSelector(state=>state.user) ;
    const [complaints, setComplaints] = useState([]);
    const [error, setError] = useState(null);
    // const id=useParams();

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
            //   console.log(`Fetching complaints for ID: ${id}`);
                const response = await axios.get(`http://localhost:8080/api/complaints/my/${currentUser._id}`,{
                  withCredentials:true,
                });
                 // Debugging: Log the response
                 console.log('API Response:', response.data);
                setComplaints(response?.data) ;
            } catch (err) {
                    // Debugging: Log the error
                    console.error('Error fetching complaints:', err);
                    setError('Error fetching complaints: ' + err.message);
            }
        };
        fetchComplaints() ;
    }, [currentUser._id]) ;

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-red-800 font-jakarta">My Complaints</h1>
            {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <>
            <div className=''>
            <Complaint key={complaint._id} complaint={complaint}/>
            </div>
            </>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No complaints found.</p>
        )}
        </div>
    );
};

export default MyComplaints;
