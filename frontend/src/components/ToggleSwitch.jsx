import React, { useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";

const ToggleSwitch = ({ theme, setTheme, setThemeNumber }) => {
   const toggleSwitch = () => {
      setTheme(!theme);
      setThemeNumber(theme ? 0 : 1);
   };
   return (
      <div className="toggle-switch">
         <input
            type="checkbox"
            id="toggle"
            className="toggle-input"
            checked={theme}
            onChange={toggleSwitch}
         />
         <label htmlFor="toggle" className="toggle-label">
            <span className="toggle-text">
               {theme ? (
                  <MdOutlineWbSunny size="23" color=" #FFD700" />
               ) : (
                  <BsFillMoonStarsFill size="23" color=" #FFD700" />
               )}
            </span>
            <div className="toggle-button"></div>
         </label>
      </div>
   );
};

export default ToggleSwitch;
