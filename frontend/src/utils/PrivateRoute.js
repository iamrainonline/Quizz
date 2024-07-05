import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Game from "../pages/Game";

const PrivateRoute = ({ children }) => {
   const { currentUser } = useContext(AuthContext);

   return currentUser ? children : <Game />;
};

export default PrivateRoute;
