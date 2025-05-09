import { use } from "react";
import { useContext, createContext, useState } from "react";
import { userFetcher } from "../lib/userFetcher";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})
    return <userContext.Provider value={[user, setUser]}>
        {children}
    </userContext.Provider>
}

export const useUser = () => useContext(userContext)