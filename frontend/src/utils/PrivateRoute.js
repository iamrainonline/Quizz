import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Home from "../pages/Home";

const PrivateRoute = ({ children }) => {
   const { currentUser } = useContext(AuthContext);

   return currentUser ? children : <Home />;
};

export default PrivateRoute;
