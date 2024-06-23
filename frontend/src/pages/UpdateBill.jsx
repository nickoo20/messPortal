import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const UpdateBill = () => {
  const [billPerDay, setBillPerDay] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [entryData, setEntryData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/bills/check-entry", {
        month,
        year,
        billPerDay,
        serviceCharge
      }, {
        withCredentials: true
      });

      if (res.data.exists) {
        setEntryData({ month, year, billPerDay, serviceCharge });
        setModalIsOpen(true);
      } else {
        await axios.post('http://localhost:8080/api/bills/update-billPerDay', { month, year, billPerDay, serviceCharge }, {
          withCredentials: true
        });
        toast.success('Entry created successfully.');
      }
    } catch (error) {
      const msg = error.response?.data?.message || "An error occurred";
      toast.error(msg);
    }
  };

  const handleReplaceEntry = async () => {
    try {
      await axios.post('http://localhost:8080/api/bills/update-billPerDay', entryData, {
        withCredentials: true
      });
      toast.success('Entry replaced successfully.');
      setModalIsOpen(false);
    } catch (error) {
      const msg = error.response?.data?.message || "An error occurred";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border-r-4 border-blue-500">
        <h1 className="text-2xl font-bold mb-6 text-center font-jakarta">Set Bill Per Day</h1>
        <form onSubmit={handleSubmit} className="space-y-4 font-inter flex flex-col gap-2">
          <div>
            <label className='text-gray-700'>Enter month :</label>
            <input
              type="number"
              placeholder="Enter Month (MM)"
              value={month}
              name='month'
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className='text-gray-700'>Enter year: </label>
            <input
              type="number"
              placeholder="Enter Year (YYYY)"
              value={year}
              name='year'
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 mt-2 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor='service-charge' className='text-gray-700'>Enter Bill Per Day :</label>
            <input
              type="number"
              placeholder="Bill per Day"
              value={billPerDay}
              name='billPerDay'
              onChange={(e) => setBillPerDay(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor='service-charge' className='text-gray-700'>Enter Service Charge :</label>
            <input
              type="number"
              placeholder="Service Charge"
              value={serviceCharge}
              name='serviceCharge'
              onChange={(e) => setServiceCharge(e.target.value)}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
          <button
            type="submit"
            className="bg-blue-500 px-4 text-sm text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
            Submit
          </button>
              </div>
        </form>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Replacement"
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4">Confirm Replacement</h2>
          <p className="mb-4">This entry already exists. Do you want to replace it?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleReplaceEntry}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Replace
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateBill;
