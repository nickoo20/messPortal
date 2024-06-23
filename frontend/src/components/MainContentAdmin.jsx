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

  if (selectedOption === "add") {
    return (
      <div className="p-4 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 font-jakarta text-blue-700 text-center">
          Add Mess Representatives!
        </h2>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Enter Registration Number for the student to be assigned as MR:
          </label>
          <div className="flex justify-between gap-4 w-full p-2">
            <div className="flex items-center w-full gap-2 px-2 border border-gray-300 rounded-lg bg-white relative group">
              <FaSearch className="text-gray-500" size={18} />
              <input
                type="number"
                placeholder="Registration Number in format: 20200832 from 2020NITSGR0832"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="px-2 py-2 w-full focus:outline-none rounded-lg text-sm font-inter"
              />
              <div className="relative flex items-center">
                <FaInfoCircle className="text-gray-500 cursor-pointer ml-2" />
                <div className="absolute bottom-8 left-0 w-64 p-2 bg-white border border-gray-300 rounded-md shadow-md text-xs text-gray-700 hidden group-hover:flex flex-col">
                  <div>Registration Number in format:</div>
                  <div>(e.g., <span className="text-green-700">20200832</span> becomes <span className="text-green-700">2020NITSGR0832</span>)</div>
                </div>
              </div>
            </div>
            <button
              onClick={handleAddMr}
              className=" p-4 bg-blue-200 text-white rounded-full hover:bg-gray-800 transition duration-200 font-semibold"
            >
              <div className="flex flex-col items-center">
                <IoMdPersonAdd className="text-blue-700" size={18} />
                {/* <span className="text-sm">Add</span> */}
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 font-jakarta text-rose-700 text-center">
        Remove Mess Representatives
      </h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <>
            <li
              key={student.registrationNumber}
              className="flex text-sm md:text-md items-center p-2 justify-between rounded-lg border-gray-500"
            >
              <div className="flex items-center gap-2">
                <button className="bg-blue-200 p-2 rounded-full">
                  <IoPersonSharp className="text-blue-700" size={18} />
                </button>
                <div className="flex items-center gap-3 font-jakarta text-gray-700 text-md">
                  <span className="capitalize">{student.name}</span>
                  <span>({formatRegistrationNumber(student.registrationNumber)})</span> 
                </div>
              </div>
              <button
                onClick={() => onRemoveMr(student.registrationNumber)}
                className="p-2 text-red-700 bg-red-200 rounded-full transition duration-200 font-semibold"
              >
                <IoPersonRemoveSharp size={18} />
              </button>
            </li>
            <hr />
          </>
        ))}
      </ul>
    </div>
  );
};

export default MainContentAdmin;
