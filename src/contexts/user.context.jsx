import { createContext, useContext, useState, useEffect } from "react";
import { userFetcher } from "../lib/userFetcher";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await userFetcher(setUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser, loading]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
