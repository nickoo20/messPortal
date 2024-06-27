import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdminPage from '../pages/admin/AdminPage';
import AccountantPage from './AccountantPage';

const ProtectedRouteAdmin = () => {
  const { user } = useSelector(state=>state.admin) ;
  if(!user){
    return <Navigate to='/login-admin'/>
  }
  else if(user.role === 'warden')
      return <AdminPage/> 
  else if(user.role === 'accountant'){
    return <AccountantPage/>
  }
};

export default ProtectedRouteAdmin;
