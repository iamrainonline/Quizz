import React, { useState, useEffect } from "react";
import blogImage from "../images/1.jpg";
import { getPosts } from "../API/posts.js";
import moment from "moment";
import "../SCSS/Home.scss";

const Home = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      const getData = async () => {
         const response = await getPosts();
         setData(response);
      };
      getData();
   }, []);

   const formatDate = (dateString) => {
      return moment(dateString).format("MMMM DD, YYYY HH:mm");
   };

   return (
      <div>
         <div className="blog">
            <div className="blogwrapper">
               <div className="leftwrapper">
                  <div className="leftside">
                     <p>Other posts</p>
                     <div className="imagewrapper">
                        <img src={blogImage} alt="" />
                     </div>
                     <h3>Enter at your peril, past the vaulted door</h3>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime odit cumque dolore veniam quo non animi,
                        molestias autem.
                     </p>
                     <p className="date">08 June 2024</p>
                  </div>
                  <div className="leftside">
                     <div className="imagewrapper">
                        <img src={blogImage} alt="" />
                     </div>
                     <h3>Enter at your peril, past the vaulted door</h3>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime odit cumque dolore veniam quo non animi,
                        molestias autem.
                     </p>
                     <p className="date">08 June 2024</p>
                  </div>
                  <div className="leftside">
                     <div className="imagewrapper">
                        <img src={blogImage} alt="" />
                     </div>
                     <h3>Enter at your peril, past the vaulted door</h3>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime odit cumque dolore veniam quo non animi,
                        molestias autem.
                     </p>
                     <p className="date">08 June 2024</p>
                  </div>
               </div>

               <div className="centerwrapper">
                  <div className="center">
                     {data?.map((item, key) => (
                        <div key={key}>
                           <p>Latest posts</p>
                           {/* <img src={blogImage} alt="" /> */}
                           <div className="imagewrapper">
                              <img
                                 src="https://picsum.photos/1200/1200"
                                 alt=""
                              />
                           </div>
                           <p className="center-date">
                              {formatDate(item?.created_at)}
                           </p>
                           <h1>{item?.title}</h1>
                           <p>{item?.content}</p>
                           <button>READ MORE</button>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="rightwrapper">
                  <div className="rightside">
                     <p>On the same category</p>
                     <div className="imagewrapper">
                        <img src="https://picsum.photos/200/300" alt="" />
                     </div>
                     <h3>Enter at your peril, past the vaulted door</h3>
                     <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Accusamus, voluptate minus! Illum ullam doloribus
                        ipsum eos porro sit?
                     </p>
                     <p className="date">08 June 2024</p>
                  </div>
                  <div className="rightside">
                     <div className="imagewrapper">
                        <img src={blogImage} alt="" />
                     </div>
                     <h3>Enter at your peril, past the vaulted door</h3>
                     <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Accusamus, voluptate minus! Illum ullam doloribus
                        ipsum eos porro sit?
                     </p>
                     <p className="date">08 June 2024</p>
                  </div>
                  <div className="rightside">
                     <div className="imagewrapper">
                        <img src={blogImage} alt="" />
                     </div>
                     <h3>Enter at your peril, past the vaulted door</h3>
                     <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Accusamus, voluptate minus! Illum ullam doloribus
                        ipsum eos porro sit?
                     </p>
                     <p className="date">08 June 2024</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
