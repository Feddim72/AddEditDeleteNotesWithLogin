import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { tokenKey } from "utils/auth";
interface PrivateRouteAuthProps {
  children: JSX.Element;
}
const PrivateRouteAuth = ({ children }: PrivateRouteAuthProps) => {
  const location = useLocation();
  const auth = localStorage.getItem(tokenKey);

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRouteAuth;
