import React, { useState, useEffect, useContext } from "react";
import QuestionsAPI from "../API/Questions";
import "../SCSS/Playgame.scss";
import { FaHeart } from "react-icons/fa";
import fifty from "../images/fifty.jpg";
import freeztime from "../images/frozen_clock.png";
import skip from "../images/skip.jpg";
import { AuthContext } from "../context/authContext";
import { all } from "axios";

const Playgame = () => {
   const [timer, setTimer] = useState(235);
   const [questions, setQuestions] = useState([]);
   const [livesLeft, setLivesLeft] = useState(Array(3).fill("life"));
   const [freezeTime, setFreezeTime] = useState(false);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
   const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
   const [answerColor, setAnswerColor] = useState("");
   const [pointerEvents, setPointerEvents] = useState("");
   const [streak, setStreak] = useState(0);
   const [points, setPoints] = useState(0);
   // powerups
   const [freezePowerUp, setFreezePowerUp] = useState(3);
   const [skipPowerUp, setSkipPowerUp] = useState(3);
   const [fiftyFifty, setFiftyFifty] = useState(3);

   // context
   const { allCategories, setAllCategories } = useContext(AuthContext);

   // Shuffle array function
   const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
   };

   // Function to handle answer selection
   const handleAnswerClick = (
      clickedAnswer,
      correctAnswer,
      newPoints,
      index
   ) => {
      setPointerEvents("none");
      setClickedButtonIndex(index);

      const correctIndex =
         questions[currentQuestionIndex].options.indexOf(correctAnswer);
      setCorrectAnswerIndex(correctIndex);

      if (clickedAnswer !== correctAnswer) {
         setAnswerColor("red");
         setStreak(0);
         setTimer(15);
         setLivesLeft((prevLives) => prevLives.slice(0, -1));
      } else {
         setAnswerColor("green");
         setPoints(points + newPoints);
         setTimer(15);
         setStreak(streak + 1);
      }

      setTimeout(() => {
         setCurrentQuestionIndex(currentQuestionIndex + 1);
         setPointerEvents("");
         setClickedButtonIndex(null);
         setCorrectAnswerIndex(null);
         setAnswerColor("");
      }, 2000);
   };

   // Effect to shuffle questions on component mount
   useEffect(() => {
      if (typeof allCategories == "undefined") {
         window.location.href = "/game";
      }
      const shuffledQuestions = shuffleArray([...QuestionsAPI]);
      // filter categories
      const selectedCategories = allCategories?.map(
         (category) => category.name
      );
      const filteredQuestions = shuffledQuestions.filter((question) =>
         selectedCategories?.includes(question.category)
      );
      setQuestions(filteredQuestions);
   }, []);

   // Effect to handle timer logic
   useEffect(() => {
      let intervalId;
      if (!freezeTime && timer > 0 && typeof timer === "number") {
         intervalId = setInterval(() => {
            setTimer((prevTimer) =>
               prevTimer === 0 ? "Time is over" : prevTimer - 1
            );
         }, 1000);
      } else if (!freezeTime && timer === 0) {
         setTimer("Time is over");
      }

      return () => clearInterval(intervalId);
   }, [freezeTime, timer]);

   // Effect to handle freeze time power-up
   useEffect(() => {
      let timeoutId;
      if (freezeTime) {
         timeoutId = setTimeout(() => {
            setFreezeTime(false);
         }, 10000);
      }

      return () => clearTimeout(timeoutId);
   }, [freezeTime]);

   // Render JSX
   return (
      <div className="playgame">
         <div
            className={
               !freezeTime ? "playgame-wrapper" : "playgame-game-frozenwrapper"
            }
         >
            <div className="header">
               {/* categories + streak + currentPoints */}
               <div className="category-wrapper">
                  <li>
                     <b>{questions[currentQuestionIndex]?.category}</b>
                  </li>
                  <li>
                     Points: <b>{points}</b>
                  </li>
                  <li>
                     Streak: <b>{streak}</b> in a row
                  </li>
               </div>
               {/* Lives left  */}
               <div>
                  <div className="lives">
                     {livesLeft?.map((life, index) => (
                        <div key={index} className="life">
                           <FaHeart color="red" size="35" />
                        </div>
                     ))}
                  </div>
                  {/* TIMER COUNTER */}
                  <div className={!freezeTime ? "timer" : "frozen"}>
                     {timer}
                  </div>
               </div>

               {/* powerupts freeztime + skip + 50/50 */}
               <div className="powerups">
                  <div
                     style={
                        freezeTime || freezePowerUp <= 0
                           ? { pointerEvents: "none" }
                           : {}
                     }
                     className="power-up pu-1"
                     onClick={() => {
                        setFreezeTime(!freezeTime);
                        setFreezePowerUp(freezePowerUp - 1);
                     }}
                  >
                     <img src={freeztime} alt="" />
                     <p>({freezePowerUp}/3)</p>
                  </div>
                  <div
                     onClick={() => {
                        setSkipPowerUp(skipPowerUp - 1);
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                     }}
                     style={skipPowerUp <= 0 ? { pointerEvents: "none" } : {}}
                     className="power-up pu-2"
                  >
                     <img src={skip} alt="" />
                     <p>({skipPowerUp}/3)</p>
                  </div>
                  <div className="power-up pu-3">
                     <img src={fifty} alt="" />
                     <p>(3/3)</p>
                  </div>
               </div>
            </div>

            {timer > -1 &&
            timer !== "Game is over" &&
            timer !== "Time is over" ? (
               <div className="question-section">
                  <div className="question">
                     <b
                        style={{
                           fontSize: "18px",
                           color: getColorByDifficulty(
                              questions[currentQuestionIndex]?.difficulty
                           ),
                        }}
                     >
                        {questions[currentQuestionIndex]?.difficulty}
                     </b>
                     <br />
                     {questions[currentQuestionIndex]?.question}
                  </div>
                  <div className="buttons">
                     {questions[currentQuestionIndex]?.options?.map(
                        (option, index) => (
                           <button
                              key={index}
                              style={{
                                 backgroundColor: getButtonColor(index),
                                 pointerEvents: pointerEvents,
                              }}
                              onClick={() =>
                                 handleAnswerClick(
                                    option,
                                    questions[currentQuestionIndex]
                                       ?.correctAnswer,
                                    questions[currentQuestionIndex]?.points,
                                    index
                                 )
                              }
                           >
                              {option}
                           </button>
                        )
                     )}
                  </div>
               </div>
            ) : (
               <div className="play-again-btn">
                  <button onClick={() => resetGame()}>Play again</button>
               </div>
            )}
         </div>
      </div>
   );

   // Helper functions
   function getColorByDifficulty(difficulty) {
      switch (difficulty) {
         case "easy":
            return "#22A6F2";
         case "medium":
            return "#71BC79";
         case "hard":
            return "#FF3C28";
         default:
            return "black";
      }
   }

   function getButtonColor(index) {
      if (index === clickedButtonIndex) {
         return answerColor;
      } else if (index === correctAnswerIndex && answerColor === "red") {
         return "orange";
      } else {
         return "";
      }
   }

   function resetGame() {
      setTimer(10);
      setLivesLeft(Array(3).fill("life"));
      setPoints(0);
      setCurrentQuestionIndex(0);
      setStreak(0);
      setQuestions(shuffleArray([...QuestionsAPI]));
   }
};

export default Playgame;
