import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  return localStorage.getItem('auth') ? children : <Navigate to="/login" />;
};

export default Auth;
