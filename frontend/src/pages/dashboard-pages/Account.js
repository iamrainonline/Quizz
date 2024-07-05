import React from "react";
import "../../SCSS/Account.scss";

const Account = () => {
   return (
      <div className="account-container">
         <div className="top-section">
            <div className="profile-settings">
               <h2>Profile Settings</h2>
               <div className="profile-section">
                  <div className="profile-picture">
                     <img src="https://picsum.photos/100/100" alt="Profile" />
                     <div className="image-wrapper">
                        <p>
                           <strong>Name:</strong> Ion
                        </p>
                        <p>
                           <strong>Email:</strong> ion@yahoo.com
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="role-section">
               <span>Welcome to your dashboard, user</span>
               <p>
                  <strong>Role:</strong> Programmer
               </p>
               <p>
                  <strong>Is Admin:</strong> true
               </p>
            </div>
         </div>
         <div className="general-info-section">
            <label htmlFor="name">
               <p>Name:</p>
               <input type="text" id="name" defaultValue="Ion" />
            </label>
            <label htmlFor="email">
               <p>Email:</p>
               <input type="text" id="email" defaultValue="ion@yahoo.com" />
            </label>
            <label htmlFor="role">
               <p>Role:</p>
               <input type="text" id="role" defaultValue="Programmer" />
            </label>
            <label htmlFor="isAdmin">
               <p>Is Admin:</p>
               <input type="text" id="isAdmin" defaultValue="true" />
            </label>
         </div>
         <button>Save</button>
      </div>
   );
};

export default Account;
