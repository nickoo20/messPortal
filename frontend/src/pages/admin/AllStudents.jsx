import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaDownload } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner' ;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading spinner

  const fetchStudents = async () => {
    setLoading(true); // Start loading spinner
    try {
      const response = await axios.get('http://localhost:8080/api/students', {
        withCredentials: true,
        params: { search },
      });
      if (response.status === 200) {
        setStudents(response?.data.students);
        setError(null);
      } else {
        setError('Failed to fetch students');
      }
    } catch (error) {
      setError('An error occurred while fetching students');
    } finally {
      setLoading(false); // Stop loading spinner
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
    <div className="min-h-screen p-4 max-w-4xl mx-auto border bg-white rounded-lg overflow-hidden">
      <h1 className="text-2xl text-gray-600 font-bold mb-6 text-center">Student List</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-col gap-2 items-center justify-center">
          <label htmlFor="registrationNumber" className="block italic text-sm font-medium text-gray-700">
            Registration Number in format: <span className="text-blue-700 font-medium">20200832</span> from <span className="text-blue-700 font-medium">2020</span>-NITSGR-<span className="text-blue-700 font-medium">0832</span>
          </label>
          <div className="flex w-full relative">
            <input
              type="text"
              placeholder="Search students by name or registration number"
              value={search}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              className="text-gray-700 p-2 rounded-full transition duration-300"
            >
              <FaSearch className="inline-block absolute right-10 bottom-2" />
            </button>
          </div>
        </div>
      </form>
      {loading && <LoadingSpinner />} {/* Display loading spinner while fetching */}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {students?.length > 0 && (
        <div className="flex justify-end text-sm">
          <button
            onClick={downloadCSV}
            className=" font-medium textsm border px-4 py-2 rounded-full hover:bg-gray-600 hover:text-white text-gray-700 transition duration-300 flex items-center"
          >
            <FaDownload className="inline-block mr-2" /> Download CSV
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        {students?.length > 0 ? (
          <table className="mt-6 w-full text-sm min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Registration Number</th>
                <th className="border border-gray-300 px-4 py-2">Enrollment Number</th>
                <th className="border border-gray-300 px-4 py-2">Contact Number</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student, index) => (
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
          !loading && <div className="text-center mt-4">No students found</div>
        )}
      </div>
      
    </div>
  );
};

export default StudentList;