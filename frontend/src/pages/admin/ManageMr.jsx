import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/MR_SideBar';
import MainContentAdmin from '../../components/MainContentAdmin';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-hot-toast';

const ManageMr = () => {
  const [selectedOption, setSelectedOption] = useState('remove');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('Remove MR');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/mr/all');
      setStudents(response.data);
      setLoading(false);
      if (response.data.length === 0) setText('No MR assigned');
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleRemoveMr = async (registrationNumber) => {
    try {
      await axios.patch(`http://localhost:8080/api/mr/remove/${registrationNumber}`);
      fetchStudents();
      toast.success('MR removed successfully');
    } catch (error) {
      toast.error('Error removing MR!');
      console.error('Error removing MR:', error);
    }
  };

  const handleAddMr = async (registrationNumber) => {
    try {
      await axios.patch(`http://localhost:8080/api/mr/add/${registrationNumber}`);
      fetchStudents();
      setSelectedOption('remove');
      toast.success('MR added successfully');
    } catch (error) {
      toast.error('Error adding MR!');
      console.error('Error adding MR:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-6">
      <div className="md:w-60">
        <Sidebar onSelectOption={handleSelectOption} />
      </div>
      <div className="flex-grow ml-0 md:ml-6 mt-6 md:mt-0">
        <MainContentAdmin
          selectedOption={selectedOption}
          students={students}
          onRemoveMr={handleRemoveMr}
          onAddMr={handleAddMr}
          textontop={text}
        />
      </div>
    </div>
  );
};

export default ManageMr;
