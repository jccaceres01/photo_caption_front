import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { credentialsSelector } from '../../features/auths/authsSlice';

const Auth = ({ children }) => {
  const credentials = useSelector(credentialsSelector);

  if (credentials) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
}

export default Auth;