import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import EditModal from "../utils/EditModal";
import { IoIosAddCircle } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
// dashboard-pages
import CreatePost from "./dashboard-pages/CreatePost";
import Comments from "./dashboard-pages/Comments";
import Settings from "./dashboard-pages/Settings";
import Users from "./dashboard-pages/Users";
import Posts from "./dashboard-pages/Posts";
import Account from "./dashboard-pages/Account";
// scss
import "../SCSS/Dashboard.scss";
const Home = () => {
   const { logout, currentUser, loading } = useContext(AuthContext);
   const [linkclicked, setlinkclicked] = useState("");

   // content render for dashboard

   const renderContent = () => {
      switch (linkclicked) {
         case "create-post":
            return <CreatePost />;
         case "users":
            return <Users />;
         case "posts":
            return <Posts />;
         case "comments":
            return <Comments />;
         case "settings":
            return <Settings />;
         default:
            return <Account />;
      }
   };
   return (
      <div className="home">
         <div className="dashboard">
            <div className="dashboard-panels">
               <div className="left-panel">
                  <h1 className="db-name">Dashboard v1.0</h1>
                  <div className="links">
                     <div
                        className="user-details user"
                        onClick={() => setlinkclicked("account")}
                     >
                        <img
                           src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
                           alt=""
                           width="32px"
                           height="32px"
                        />
                        {currentUser.username}
                     </div>
                     <div
                        className="user-details"
                        onClick={() => setlinkclicked("create-post")}
                     >
                        <IoIosAddCircle size="20" />
                        <p>Create Post</p>
                     </div>
                     <div
                        className="user-details"
                        onClick={() => setlinkclicked("posts")}
                     >
                        <BsChatLeftTextFill size="20" />
                        <p>View Posts</p>
                     </div>
                     <div
                        className="user-details"
                        onClick={() => setlinkclicked("users")}
                     >
                        <FaUsers size="20" />
                        <p>Manage Users</p>
                     </div>

                     <div
                        className="user-details"
                        onClick={() => setlinkclicked("settings")}
                     >
                        <FaCog size="20" />
                        <p>Settings & Commands</p>
                     </div>
                  </div>
               </div>
               <div className="right-panel">
                  <div className="panel-content">
                     <div className="content">{renderContent()}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
