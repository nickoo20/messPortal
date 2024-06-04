// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ onSelectOption }) => {
  return (
    <div className="bg-gray-800 text-white h-screen p-4 w-64">
      <button
        className="w-full mb-4 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded"
        onClick={() => onSelectOption('remove')}
      >
        Remove MR
      </button>
      <button
        className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded"
        onClick={() => onSelectOption('add')}
      >
        Add MR
      </button>
    </div>
  );
};

export default Sidebar;
