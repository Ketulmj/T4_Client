import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user.context";
import { userFetcher } from "../lib/userFetcher";

const NoAuth = ({ children }) => {
  const [user, setUser] = useUser();
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.UserId) {
        await userFetcher(user, setUser);
      }
    }
    fetchUser();
  }, []);
  return user?.UserId ? children : <Navigate to="/dashboard" replace />;
};

export default NoAuth;
