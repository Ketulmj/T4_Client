import { createContext, useContext, useState, useEffect } from "react";
import { userFetcher } from "../lib/userFetcher";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      await userFetcher(setUser);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
