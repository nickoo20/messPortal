import React from 'react';
import Sidebar from '../../components/MR_SideBar';
import MainContentAdmin from '../../components/MainContentAdmin.jsx';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner.jsx'; 
import {toast} from 'react-hot-toast' ;

const ManageMr=() => {
  const [selectedOption, setSelectedOption] = useState('remove');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [text,setText]=useState("Remove MR");
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/mr/all');
      setStudents(response.data);
      setLoading(false); // Data fetching complete
      if(response.data.length===0)
      setText("No MR assigned");
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false); // Data fetching failed
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleRemoveMr = async (registrationNumber) => {
    try {
      await axios.patch(`http://localhost:8080/api/mr/remove/${registrationNumber}`);
      fetchStudents();
    } catch (error) {
      toast.error('Error removing MR!') ;
      console.error('Error removing MR:', error);
    }
  };

  const handleAddMr = async (registrationNumber) => {
    try {
      await axios.patch(`http://localhost:8080/api/mr/add/${registrationNumber}`);
      fetchStudents();
      setSelectedOption('remove'); // Switch back to remove view after adding MR
      toast.success('MR added successfully');
    } catch (error) {
      toast.error('Error adding MR!') ;
      console.error('Error adding MR:', error);
    }
  };

  if (loading) {
    return <div className='flex justify-center items-center'><LoadingSpinner/></div>; // Show loading state
  }

  return (
    <div className="flex justify-evenly">
        <MainContentAdmin
          selectedOption={selectedOption}
          students={students}
          onRemoveMr={handleRemoveMr}
          onAddMr={handleAddMr}
          textontop={text}
        />
      <Sidebar onSelectOption={handleSelectOption} />
    </div>
  );
}
export default ManageMr;