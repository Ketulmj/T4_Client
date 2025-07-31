import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user.context";
import Loader from "../components/Loader";

const NoAuth = ({ children }) => {
  const [user, , loading] = useUser();

  if (loading) {
    return <Loader />;
  }

  return user ? <Navigate to="/dashboard" /> : children;
};

export default NoAuth;
