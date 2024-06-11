import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '/Users/richashrivastava/finalyear/messPortal/frontend/src/components/ProfileDropdown.jsx'

const NavigationButtons = () => {
  const navigate = useNavigate();

  const goToAllBills = () => {
    navigate('/allbills');
  };

  const goToIndividualBill = () => {
    navigate('/singlebill');
  };
  const goToUpdateBill=()=>{
    navigate('/updateBill');
  }
  const goToExpenses=()=>{
    navigate('/expense');
  }
  const goToFestCharge=()=>{
    navigate('/fest-charge');
  }
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
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={goToUpdateBill}
      >Update Bill-PerDay</button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={goToExpenses}
      >Manage Expense</button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={goToFestCharge}
      >Festival Charges</button>
    </div>
  );
};

export default NavigationButtons;
