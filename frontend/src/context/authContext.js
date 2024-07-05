import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("userData")) || null
   );
   const [loading, setLoading] = useState(true);

   const logout = async () => {
      await axios.post("/auth/logout", null, {
         withCredentials: true,
      });
      setCurrentUser(null);
   };

   useEffect(() => {
      localStorage.setItem("userData", JSON.stringify(currentUser));
      setLoading(false);
   }, [currentUser]);

   return (
      <AuthContext.Provider
         value={{ currentUser, logout, loading, setCurrentUser }}
      >
         {children}
      </AuthContext.Provider>
   );
};
