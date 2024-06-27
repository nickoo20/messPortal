import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import StudentPage from '../pages/StudentPage';

const ProtectedRouteStudent = () => {
  const { currentUser } = useSelector(state=>state.user) ;
  return currentUser ? <StudentPage/> : <Navigate to='/login-student'/>
};

export default ProtectedRouteStudent;
