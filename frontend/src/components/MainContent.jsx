// src/components/MainContent.jsx
import React, { useState } from 'react';

const MainContent = ({ selectedOption, students, onRemoveMr, onAddMr,textontop }) => {
  const [registrationNumber, setRegistrationNumber] = useState(0);

  const handleAddMr = () => {
    onAddMr(registrationNumber);
    setRegistrationNumber('');
  };

  if (selectedOption === 'add') {
    return (
      <div className="p-4">
        <h2 className="text-2xl mb-4">Remove MR</h2>
        <input
          type="Number"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleAddMr}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add MR
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{textontop}</h2>
      <ul>
        {students.map((student) => (
          <li key={student.registrationNumber} className="flex justify-between items-center mb-2">
            <span>{student.name} ({student.registrationNumber})</span>
            <button
              onClick={() => onRemoveMr(student.registrationNumber)}
              className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainContent;
