import React from 'react';
import {Link} from 'react-router-dom';
// import AllComplaints from './AllComplaints';
// import MarkLeave from './MarkLeave';
// import SeeMenu from './SeeMenu';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

import Cookies from 'js-cookie';
import { useAuth } from '../../context/userContext' ; 
import ProfileDropdown from '../../components/ProfileDropdown'; 
import { useSelector } from 'react-redux';

const AdminLanding = () => {
  // const [auth, setAuth] = useAuth();
  const {user} = useSelector(state=>state.admin) ;

  if (!user) {
    return (
      <>
        <h1>Please Login first!!</h1>
      </>
    );
  }
    // if(user.role !== "warden"){
    //   return (
    //     <p>You don't have access to this page.</p>
    //   )
    // }
  return (
    
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
          <header className="w-full bg-blue-500 p-4 flex justify-end">
        <ProfileDropdown />
      </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Link to="/allcomplaints" className="card">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-200 hover:scale-105">
              <h3 className="text-xl font-bold text-gray-700">All Complaints</h3>
            </div>
          </Link>
          <Link to="/mark-leave" className="card">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-200 hover:scale-105">
              <h3 className="text-xl font-bold text-gray-700">Mark Leave</h3>
            </div>
          </Link>
          <Link to="/see-menu" className="card">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-200 hover:scale-105">
              <h3 className="text-xl font-bold text-gray-700">See Menu</h3>
            </div>
          </Link>
          <Link to="/manage-mr" className="card">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-200 hover:scale-105">
              <h3 className="text-xl font-bold text-gray-700">Manange MR</h3>
            </div>
          </Link>
        </div>
        
        {/* <Switch>
          <Route path="/allcomplaints" component={AllComplaints} />
          <Route path="/mark-leave" component={MarkLeave} />
          <Route path="/see-menu" component={SeeMenu} />
        </Switch> */}
      </div>

  );
};

export default AdminLanding;
