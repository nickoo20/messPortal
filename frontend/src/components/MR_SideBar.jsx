// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ onSelectOption }) => {
  return (
    <div className=" text-white rounded-lg p-4 flex flex-col shadow-md">
      <button
        className="w-full mb-4 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg flex-1 font-jakarta"
        onClick={() => onSelectOption('remove')}
      >
        Remove MR
      </button>
      <button
        className="w-full px-4 bg-gray-600 hover:bg-gray-700 flex-1 rounded-lg font-jakarta"
        onClick={() => onSelectOption('add')}
      >
        Add MR
      </button>
    </div>
  );
};

export default Sidebar;
