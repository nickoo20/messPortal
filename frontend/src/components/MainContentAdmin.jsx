import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoPersonRemoveSharp, IoPersonSharp } from "react-icons/io5";

const MainContentAdmin = ({
  selectedOption,
  students,
  onRemoveMr,
  onAddMr,
  textontop,
}) => {
  const [registrationNumber, setRegistrationNumber] = useState("");

  const handleAddMr = () => {
    if (registrationNumber) {
      onAddMr(registrationNumber);
      setRegistrationNumber("");
    }
  };

  if (selectedOption === "add") {
    return (
      <div className="p-4 w-full md:w-2/3">
        <h2 className="text-3xl font-bold mb-6 font-jakarta text-blue-700 text-center">
          Add Mess Representatives!
        </h2>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Enter Registration Number for the student to be assigned as MR:
          </label>
          <div className="flex justify-between gap-4 w-full p-2">
            <div className="flex items-center w-full gap-2 px-2 border border-gray-300 rounded-lg bg-white">
              <FaSearch className="text-gray-500" size={18} />
              <input
                type="number"
                placeholder="Enter Registration Number to be an MR"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="px-2 py-2 w-full focus:outline-none rounded-lg font-inter"
              />
            </div>
            <button
              onClick={handleAddMr}
              className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-200 font-semibold"
            >
              <div className="flex flex-col items-center">
                <IoMdPersonAdd size={20} />
                <span className="text-sm">Add</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full md:w-2/3">
      <h2 className="text-3xl font-bold mb-6 font-jakarta text-rose-700 text-center">
        Remove Mess Representatives!
      </h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <li
            key={student.registrationNumber}
            className="flex items-center p-4 justify-between rounded-lg bg-orange-50 shadow-md border-r-4"
          >
            <div className="flex items-center gap-2">
              <IoPersonSharp className="text-gray-700" size={18} />
              <span className="font-jakarta text-gray-700 text-md">
                {student.name.toUpperCase()} ({student.registrationNumber})
              </span>
            </div>
            <button
              onClick={() => onRemoveMr(student.registrationNumber)}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 font-semibold"
            >
              <IoPersonRemoveSharp size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainContentAdmin;
