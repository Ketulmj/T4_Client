// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState({})
//     return <userContext.Provider value={[user, setUser]}>
//         {children}
//     </userContext.Provider>
// }
// 
import { createContext, useContext, useState, useEffect } from "react";
import { userFetcher } from "../lib/userFetcher";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
