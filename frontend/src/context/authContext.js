import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("userData")) || null
   );
   const [loading, setLoading] = useState(true);
   const [difficulty, setDifficulty] = useState("");
   const [allCategories, setAllCategories] = useState();

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
         value={{
            difficulty,
            setDifficulty,
            currentUser,
            logout,
            loading,
            setCurrentUser,
            allCategories,
            setAllCategories,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
