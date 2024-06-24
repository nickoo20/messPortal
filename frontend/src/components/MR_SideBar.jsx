import React from 'react';

const Sidebar = ({ onSelectOption }) => {
  const handleSelectChange = (event) => {
    onSelectOption(event.target.value);
  };

  return (
    <div className="rounded-lg p-4 flex flex-col w-full md:w-60">
      <select
        className="font-jakarta font-semibold text-blue-800 bg-gray-50 hover:bg-gray-100 border-r-4 border-l-4 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-200 cursor-pointer text-center"
        onChange={handleSelectChange}
        defaultValue=""
      >
        <option value="" disabled>
          Choose MR
        </option>
        <option value="remove">Remove MR</option>
        <option value="add">Add MR</option>
      </select>
    </div>
  );
};

export default Sidebar;
