import React, { useContext } from "react";
import "../SCSS/Home.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Home = () => {
   const { logout, currentUser, loading } = useContext(AuthContext);
   return (
      <div className="home">
         <div className="wrapper">
            <h1>
               Welcome to <span className="quizz-mayas">Quiz It</span>
            </h1>
            <p>
               Dive into our engaging trivia game, where you'll flex your
               knowledge in history, science, pop culture, and more. Compete
               against friends or tackle solo challenges to showcase your
               expertise. With varied categories and exciting gameplay, it's
               your chance to prove you're the ultimate trivia champion!
            </p>
            <p>
               <b>Sign in</b> for or <b>Sign up</b> if you haven't registered
            </p>
            <div className="home-info">
               {!currentUser ? (
                  <Link className="link" to="/register">
                     <button>Sign Up</button>
                  </Link>
               ) : (
                  <Link className="link" to="/game">
                     <button>Play</button>
                  </Link>
               )}
            </div>
            <div className="einstein">
               <img
                  src="https://cdn.dribbble.com/users/1210339/screenshots/2776561/media/6d675b3bc1da4071bfe30b4614be55a4.gif"
                  alt=""
               />
            </div>
         </div>
      </div>
   );
};

export default Home;
