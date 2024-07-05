import React, { useState, useEffect, useContext } from "react";
import eu from "../images/eu.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ToggleSwitch from "./ToggleSwitch";
// css
import "../SCSS/Toggleswitch.scss";

const Navbar = () => {
   const { logout, currentUser, loading } = useContext(AuthContext);
   const [themeNumber, setThemeNumber] = useState(0);
   const [theme, setTheme] = useState(false);

   // navigate
   const navigate = useNavigate();

   const applyTheme = () => {
      const root = document.documentElement;
      switch (themeNumber) {
         case 0:
            // darkmode
            root.style.setProperty("--darkModeColorBG", "#26292C");
            root.style.setProperty("--darkModeColorText", "#FFFFFF");
            break;
         case 1:
            // lightmode
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
   console.log(themeNumber);
   useEffect(() => {
      applyTheme();
   }, [themeNumber, theme]);

   // Loading state
   if (loading) {
      return <div>Loading ...</div>;
   }

   return (
      <div className="navbar">
         <div className="navbarwrapper">
            <div className="logo">
               <Link className="link" to="/">
                  <img src={eu} alt="website-logo" />
               </Link>
            </div>

            <div className="links">
               <ToggleSwitch
                  theme={theme}
                  setTheme={setTheme}
                  setThemeNumber={setThemeNumber}
               />

               {currentUser ? (
                  <>
                     <Link to="/game">
                        <b> Play </b>
                     </Link>

                     <Link to="">
                        <b
                           className="logoutBtn"
                           onClick={() => {
                              logout();
                              navigate("/");
                           }}
                        >
                           Logout
                        </b>
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
   );
};

export default Navbar;
