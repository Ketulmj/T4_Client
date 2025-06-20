import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user.context";
import { userFetcher } from "../lib/userFetcher";

const Auth = ({ children }) => {
  const [user, setUser] = useUser();
  useEffect(() => {
    // const fetchUser = async () => {
      if (!user?.userId) {
        userFetcher(user, setUser);
      }
    // }
    // fetchUser();
  }, []);
  return user?.userId ? children : <Navigate to="/login" />;
};

export default Auth;
