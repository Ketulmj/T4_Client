import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user.context";
import { userFetcher } from "../lib/userFetcher";

const Auth = ({ children }) => {
  const [user, setUser] = useUser();
  useEffect(() => {
    if (!user?.UserId) {
      await userFetcher(user, setUser);
    }
  }, []);
  return user?.UserId ? children : <Navigate to="/login" replace />;
};

export default Auth;
