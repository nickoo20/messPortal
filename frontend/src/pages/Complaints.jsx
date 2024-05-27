import { useState, useEffect } from 'react';

const Complaints = () => {
  const [complaints] = useState([]);

  useEffect(() => {
    // Fetch complaints data from API
    // setComplaints(response.data);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Complaints</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.id} className="mb-2 p-2 border rounded-lg">
            {complaint.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Complaints;
