import React from "react";
import eu from "../images/eu.png";
const Footer = () => {
   return (
      <footer>
         <span>
            Made by <b>Rain</b>
         </span>
         <img src={eu} alt="" />
         <span>
            <b>Live since June 5th '24</b>
         </span>
      </footer>
   );
};

export default Footer;
