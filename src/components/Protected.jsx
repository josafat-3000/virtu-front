import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectAuthenticatedTo }) => {
  const user = useSelector((state) => state.user.user);

  if (user && redirectAuthenticatedTo) {
    console.log(user)
    return <Navigate to={redirectAuthenticatedTo}  />;
  }

  if (!user && !redirectAuthenticatedTo) {
    console.log(user, "")
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
