

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearchTerm] = useState('');
//   const [error, setError] = useState(null);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/students', {
//         withCredentials: true,
//         params: { search },
//       });
//       if (response.status === 200) {
//         setStudents(response.data.students);
//         setError(null);
//       } else {
//         setError('Failed to fetch students');
//       }
//     } catch (error) {
//       setError('An error occurred while fetching students');
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [search]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchStudents();
//   };

//   const downloadCSV = () => {
//     const headers = ['Name', 'Registration Number', 'Enrollment Number', 'Contact Number', 'Email'];
//     const csvRows = [];
//     csvRows.push(headers.join(','));

//     students.forEach(student => {
//       const row = [
//         student.name,
//         student.registrationNumber,
//         student.enrollmentNumber.toUpperCase(),
//         student.contactNumber,
//         student.email
//       ];
//       csvRows.push(row.join(','));
//     });

//     const csvContent = csvRows.join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'student_list.csv';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="mt-20 p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
//       <h1 className="text-2xl font-bold mb-6 text-center">Student List</h1>
//       <form onSubmit={handleSearch} className="mb-4">
//         <input
//           type="text"
//           placeholder="Search students by name or registration number"
//           value={search}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-2"
//         >
//           Search
//         </button>
//       </form>
//       {error && <div className="text-red-600 text-center mb-4">{error}</div>}
//       <div className="overflow-x-auto">
//         {students.length > 0 ? (
//           <table className="mt-6 min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2">Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Registration Number</th>
//                 <th className="border border-gray-300 px-4 py-2">Enrollment Number</th>
//                 <th className="border border-gray-300 px-4 py-2">Contact Number</th>
//                 <th className="border border-gray-300 px-4 py-2">Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student, index) => (
//                 <tr key={index} className="bg-white hover:bg-gray-100">
//                   <td className="border border-gray-300 px-4 py-2">{student.name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{student.registrationNumber}</td>
//                   <td className="border border-gray-300 px-4 py-2">{student.enrollmentNumber.toUpperCase()}</td>
//                   <td className="border border-gray-300 px-4 py-2">{student.contactNumber}</td>
//                   <td className="border border-gray-300 px-4 py-2">{student.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="text-center mt-4">No students found</div>
//         )}
//       </div>
//       {students.length > 0 && (
//         <button
//           onClick={downloadCSV}
//           className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
//         >
//           Download CSV
//         </button>
//       )}
//     </div>
//   );
// };

// export default StudentList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students', {
        withCredentials: true,
        params: { search },
      });
      if (response.status === 200) {
        setStudents(response.data.students);
        setError(null);
      } else {
        setError('Failed to fetch students');
      }
    } catch (error) {
      setError('An error occurred while fetching students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  const formatRegistrationNumber = (registrationNumber) => {
    const registrationStr = registrationNumber.toString();
    if (registrationStr.length > 4) {
      return registrationStr.slice(0, 4) + 'NITSGR' + registrationStr.slice(4);
    }
    return registrationStr;
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Registration Number', 'Enrollment Number', 'Contact Number', 'Email'];
    const csvRows = [];
    csvRows.push(headers.join(','));

    students.forEach(student => {
      const row = [
        student.name,
        formatRegistrationNumber(student.registrationNumber),
        student.enrollmentNumber.toUpperCase(),
        student.contactNumber,
        student.email
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'student_list.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-20 p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-6 text-center">Student List</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search students by name or registration number(put first 4 digits and then last 4 digits)"
          value={search}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-2"
        >
          Search
        </button>
      </form>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <div className="overflow-x-auto">
        {students.length > 0 ? (
          <table className="mt-6 min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Registration Number</th>
                <th className="border border-gray-300 px-4 py-2">Enrollment Number</th>
                <th className="border border-gray-300 px-4 py-2">Contact Number</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatRegistrationNumber(student.registrationNumber)}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.enrollmentNumber.toUpperCase()}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.contactNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-4">No students found</div>
        )}
      </div>
      {students.length > 0 && (
        <button
          onClick={downloadCSV}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Download CSV
        </button>
      )}
    </div>
  );
};

export default StudentList;

