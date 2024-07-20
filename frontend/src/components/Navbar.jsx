import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ToggleSwitch from "./ToggleSwitch";
import eu from "../images/eu.png";
// css
import "../SCSS/Toggleswitch.scss";

const Navbar = () => {
   const { logout, currentUser, loading } = useContext(AuthContext);
   const [themeNumber, setThemeNumber] = useState(0);
   const [theme, setTheme] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const navigate = useNavigate();

   const applyTheme = () => {
      const root = document.documentElement;
      switch (themeNumber) {
         case 0:
            root.style.setProperty("--darkModeColorBG", "#202325");
            root.style.setProperty("--darkModeColorText", "#FFFFFF");
            break;
         case 1:
            root.style.setProperty("--darkModeColorBG", "#FFFFFF");
            root.style.setProperty("--darkModeColorText", "#000000");
            break;
         case 3:
            root.style.setProperty("--lightModeColor", "#111e1f");
            root.style.setProperty("--secondColor", "#003140");
            break;
         default:
            break;
      }
   };

   useEffect(() => {
      applyTheme();
   }, [themeNumber, theme]);

   if (loading) {
      return <div>Loading ...</div>;
   }

   return (
      <div className="navbar">
         <div className="navbarwrapper">
            {/* Logo visible on all devices */}
            <div className="logo">
               <Link className="link" to="/">
                  <img src={eu} alt="website-logo" />
               </Link>
            </div>

            {/* Links and dropdown toggle */}
            <div className="navbar-content">
               <ToggleSwitch
                  theme={theme}
                  setTheme={setTheme}
                  setThemeNumber={setThemeNumber}
               />
               <div className={`dropdown ${dropdownOpen ? "show" : ""}`}>
                  <button
                     className="dropbtn"
                     onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                     Menu
                  </button>
                  <div
                     className={`dropdown-content ${
                        dropdownOpen ? "show" : ""
                     }`}
                  >
                     {currentUser ? (
                        <>
                           <Link to="/leaderboard">
                              <b>Leaderboards</b>
                           </Link>
                           <Link to="/howtoplay">
                              <b>How to play</b>
                           </Link>
                           <Link to="/game">
                              <b>Play</b>
                           </Link>
                           <Link
                              to=""
                              onClick={() => {
                                 logout();
                                 navigate("/");
                              }}
                           >
                              <b className="logoutBtn">Logout</b>
                           </Link>
                        </>
                     ) : (
                        <>
                           <Link className="link" to="/">
                              <b>Home</b>
                           </Link>
                           <Link className="link" to="/login">
                              Sign In
                           </Link>
                        </>
                     )}
                  </div>
               </div>
               {/* Desktop Links */}
               <div className="links-desktop">
                  {currentUser ? (
                     <>
                        <Link to="/leaderboard">
                           <b>Leaderboards</b>
                        </Link>
                        <Link to="/howtoplay">
                           <b>How to play</b>
                        </Link>
                        <Link to="/game">
                           <b>Play</b>
                        </Link>
                        <Link
                           to=""
                           onClick={() => {
                              logout();
                              navigate("/");
                           }}
                        >
                           <b className="logoutBtn">Logout</b>
                        </Link>
                     </>
                  ) : (
                     <>
                        <Link className="link" to="/">
                           <b>Home</b>
                        </Link>
                        <Link className="link" to="/login">
                           Sign In
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
