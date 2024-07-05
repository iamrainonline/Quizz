import React, { useState, useEffect, useContext } from "react";
import { PiUploadFill } from "react-icons/pi";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addPost } from "../../API/posts";
import { AuthContext } from "../../context/authContext";
import "../../SCSS/CreatePost.scss";

const CreatePost = () => {
   const { currentUser, setCurrentUser } = useContext(AuthContext);
   const [refreshPage, setRefreshPage] = useState(false);

   const [postData, setPostData] = useState({
      title: "",
      content: "",
      category: "",
      userId: currentUser.id,
   });

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setPostData((prevFormData) => ({ ...prevFormData, [name]: value }));
      console.log(postData);
   };

   const submitData = async (data) => {
      const response = await addPost(data);
      console.log(response);
      setPostData({
         title: "",
         content: "",
         category: "",
         userId: currentUser.id,
      });
   };

   // display all users (GET User list)
   useEffect(() => {}, [refreshPage]);

   return (
      <div className="createPost wrapper">
         <div className="post-wrapper">
            <div className="post-inputs">
               <h2>Create a post</h2>
               <br />
               <p>Post Title</p>
               <input
                  type="text"
                  value={postData.title}
                  name="title"
                  onChange={handleInputChange}
               />
               <label htmlFor="actual-btn" className="">
                  <div className="upload-icon">
                     <PiUploadFill color="green" size="20" />
                     <p>Upload Image</p>
                  </div>
               </label>
               <input type="file" className="upload" id="actual-btn" />
               <p>Post body</p>
               <textarea
                  rows="15"
                  cols="162"
                  className="ck"
                  value={postData.content}
                  onChange={handleInputChange}
                  name="content"
               />
            </div>
            <div className="post-buttons">
               <div className="categories">
                  <label htmlFor="category">Choose a category:</label>
                  <select
                     name="category"
                     id="category"
                     onChange={handleInputChange}
                     value={postData.category}
                  >
                     <option value="Art">Art</option>
                     <option value="Science">Science</option>
                     <option value="News">News</option>
                     <option value="Fashion">Fashion</option>
                  </select>
               </div>
               <br />
               <div className="btns">
                  <button>Preview</button>
                  <button onClick={() => submitData(postData)}>Publish</button>
                  <button className="deleteBtn">Delete post</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CreatePost;
