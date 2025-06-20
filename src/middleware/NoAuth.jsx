import { Navigate } from "react-router-dom";

const NoAuth = ({ children }) => {
  return localStorage.getItem('auth') ? <Navigate to="/dashboard" /> : children;
};

export default NoAuth;
