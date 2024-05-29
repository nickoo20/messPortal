import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/userContext';

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [error, setError] = useState(null);
    const [auth, setAuth] = useAuth() ; 
    const id = auth?.user?._id ;
    console.log('access_token: ',localStorage.getItem('access_token')) ;
    useEffect(() => {
        const fetchComplaints = async () => {
            if (!id) {
                setError('No ID provided');
                return;
            }

            try {
              console.log(`Fetching complaints for ID: ${id}`);
                const response = await axios.get(`http://localhost:8080/api/complaints/${id}`,{
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
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>My Complaints</h1>
            <ul>
                {complaints.map(complaint => (
                    <li key={complaint._id}>{complaint.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyComplaints;
