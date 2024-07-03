import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { FaSearch, FaInfoCircle } from "react-icons/fa";
import { IoPersonRemoveSharp, IoPersonSharp } from "react-icons/io5";

const MainContentAdmin = ({
  selectedOption,
  students,
  onRemoveMr,
  onAddMr,
  textontop,
}) => {
  const [registrationNumber, setRegistrationNumber] = useState("");

  const formatRegistrationNumber = (regNum) => {
    const regNumStr = regNum.toString(); // Convert to string
    const year = regNumStr.slice(0, 4);
    const suffix = regNumStr.slice(4);
    return `${year}NITSGR${suffix}`;
  };

  const handleAddMr = () => {
    if (registrationNumber) {
      onAddMr(registrationNumber);
      setRegistrationNumber("");
    }
  };

  return (
    <div className="p-4 w-full max-w-2xl mx-auto">
      {selectedOption === "add" ? (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6 font-jakarta text-blue-700 text-center">
            Add Mess Representatives!
          </h2>
          <label className="font-semibold text-gray-700 flex flex-col gap-2">
            <div>Enter Registration Number for the student to be assigned as MR:</div>
            <div
                className="block text-xs font-medium text-gray-700 italic"
              >
                Registration Number in format: <span className="text-blue-700 font-medium">20200832</span> from <span className="text-blue-700 font-medium"> 2020</span>-NITSGR-<span className="text-blue-700 font-medium">0832</span>
              </div>
          </label>
          <div className="flex items-center gap-2 mt-2">
            <FaSearch className="text-gray-500" size={18} />
            <input
              type="number"
              placeholder="Registration Number in format 20200832 from 2020NITSGR0832"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="px-2 py-2 w-full focus:outline-none rounded-lg text-sm font-inter border border-gray-300"
            />
            <button
              onClick={handleAddMr}
              className="p-2 bg-blue-200 text-white rounded-full hover:bg-gray-800 transition duration-200 font-semibold"
            >
              <IoMdPersonAdd className="text-blue-700" size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 font-jakarta text-rose-700 text-center">
            Remove Mess Representatives
          </h2>
          <ul className="space-y-4">
            {students.map((student) => (
              <li
                key={student.registrationNumber}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <IoPersonSharp className="text-blue-700" size={18} />
                  <div className="flex gap-1 items-center">
                    <span className="text-sm font-medium">{student.name}</span>
                    <span className="text-xs text-gray-600 hover:bg-gray-600 hover:text-white font-medium border px-2 rounded-full">
                      {formatRegistrationNumber(student.registrationNumber)}
                    </span> |
                    <span className="text-xs">{student.hostelName}</span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveMr(student.registrationNumber)}
                  className="p-2 text-red-700 bg-red-200 rounded-full transition duration-200 font-semibold"
                >
                  <IoPersonRemoveSharp size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainContentAdmin ;
