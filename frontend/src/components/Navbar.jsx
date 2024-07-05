import React, { useState, useEffect, useContext } from "react";
import eu from "../images/eu.png";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
   const { logout, currentUser, loading } = useContext(AuthContext);
   // Loading state

   if (loading) {
      return <div>Loading ...</div>;
   }

   return (
      <div className="navbar">
         <div className="navbarwrapper">
            <div className="logo">
               <img src={eu} alt="website-logo" />
            </div>
            <div className="links">
               <Link className="link" to="/">
                  Home
               </Link>
               <Link className="link" to="/contact">
                  Contact
               </Link>
               {currentUser ? (
                  <>
                     <Link to="/dashboard">
                        <b> Dashboard </b>
                     </Link>

                     <Link to="">
                        <b
                           className="logoutBtn"
                           onClick={() => {
                              logout();
                           }}
                        >
                           Logout
                        </b>
                     </Link>
                  </>
               ) : (
                  <Link className="link" to="/login">
                     Login
                  </Link>
               )}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
