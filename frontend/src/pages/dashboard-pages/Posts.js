import React, { useState, useEffect } from "react";
import blogImage from "../../images/1.jpg";
import { getPosts, deletePost } from "../../API/posts.js";
import moment from "moment";
import "../../SCSS/Posts.scss";

const Posts = () => {
   const [data, setData] = useState([]);
   const [refresh, setRefresh] = useState(false);
   const [modal, setModal] = useState({
      data: null,
      toggle: true,
      action: "",
   });

   useEffect(() => {
      const getData = async () => {
         const response = await getPosts();
         setData(response);
      };
      getData();
   }, [refresh]);
   const formatDate = (dateString) => {
      return moment(dateString).format("MMMM DD, YYYY HH:mm");
   };

   return (
      <div className="dashboard-post">
         <div className="filter-posts">
            <h3>Filter posts</h3>
            <div className="filter-options">
               <select name="author" id="author">
                  <option value="">By Author</option>
                  <option value="john_doe">John Doe</option>
                  <option value="jane_smith">Jane Smith</option>
                  <option value="alice_jones">Alice Jones</option>
                  {/* Add more authors as needed */}
               </select>
               <select name="date" id="date">
                  <option value="">By Date</option>
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
               </select>
               <select name="popularity" id="popularity">
                  <option value="">By Popularity</option>
                  <option value="liked">Most Liked</option>
                  <option value="less_liked">Less Liked</option>
               </select>
               <button>Apply filter</button>
            </div>
         </div>
         <p>All posts</p>
         {data?.map((item, key) => (
            <div className="single-post" key={key}>
               <div className="left-side-post">
                  <div className="">
                     <p className="center-date">
                        {formatDate(item?.created_at)}
                     </p>
                     <h1>{item?.title}</h1>
                     <p>{item?.content}</p>
                     <p>
                        <b> Author:</b> {item?.username}
                     </p>
                  </div>
                  <div className="button-group">
                     <button>View post</button>
                     <button>Edit post</button>
                     <button
                        className="deleteBtn"
                        onClick={() => {
                           setModal({
                              toggle: !modal.toggle,
                              data: item?.postID,
                              action: "delete",
                           });
                        }}
                     >
                        Delete post
                     </button>
                  </div>
               </div>
               <div className="imagewrapper">
                  <img src={blogImage} alt="" />
               </div>
            </div>
         ))}
         {!modal.toggle && (
            <div className="custom-alert">
               <p className="alert-text">
                  Are you sure you want to {modal.action}?
               </p>
               <div className="alertBtn">
                  <button
                     onClick={() => {
                        {
                           deletePost(modal.data);
                           setModal({
                              data: null,
                              toggle: !modal.toggle,
                           });
                           setRefresh(!refresh);
                        }
                     }}
                  >
                     Yes
                  </button>
                  <button
                     onClick={() => {
                        setModal({
                           data: null,
                           toggle: !modal.toggle,
                           action: "",
                        });
                     }}
                  >
                     NO
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default Posts;
