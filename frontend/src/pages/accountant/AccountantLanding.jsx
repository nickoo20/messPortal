import React from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import ProfileDropdown from '../../components/ProfileDropdown' ;
=======
import ProfileDropdown from '/Users/richashrivastava/finalyear/messPortal/frontend/src/components/ProfileDropdown.jsx'
>>>>>>> d06c04a85e27f4d60f0491134fc3eb445724f74b

const NavigationButtons = () => {
  const navigate = useNavigate();

  const goToAllBills = () => {
    navigate('/allbills');
  };

  const goToIndividualBill = () => {
    navigate('/singlebill');
  };

  return (
    <div className="flex justify-center space-x-4 mt-8">
       <header className="w-full bg-blue-500 p-4 flex justify-end">
        <ProfileDropdown />
      </header>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={goToAllBills}
      >
        All Bills
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={goToIndividualBill}
      >
        Individual Bill
      </button>
    </div>
  );
};

export default NavigationButtons;
