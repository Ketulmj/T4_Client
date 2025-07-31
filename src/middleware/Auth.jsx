import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user.context";
import Loader from "../components/Loader";

const Auth = ({ children }) => {
  const [user, , loading] = useUser();

  if (loading) {
    return <Loader />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default Auth;
