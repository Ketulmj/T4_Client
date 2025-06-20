import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user.context";
import { userFetcher } from "../lib/userFetcher";

const NoAuth = ({ children }) => {
  const [user, setUser] = useUser();
  const token = localStorage.getItem('auth')
  if(token) {
    return <Navigate to="/dashboard" />;
  }
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.userId) {
        await userFetcher(user, setUser);
      }
    }
    fetchUser();
  }, []);
  return !user?.userId ? children : <Navigate to="/dashboard" />;
};

export default NoAuth;
