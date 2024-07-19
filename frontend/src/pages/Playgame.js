import React, { useState, useEffect, useContext } from "react";
import "../SCSS/Playgame.scss";
import { FaHeart } from "react-icons/fa";
import fifty from "../images/fifty.jpg";
import freeztime from "../images/frozen_clock.png";
import skip from "../images/skip.png";
import { AuthContext } from "../context/authContext";
import Icycle from "../images/icycle.png";
import { getQuestions } from "../API/questions";

const Playgame = () => {
   const [timer, setTimer] = useState(15);
   const [questions, setQuestions] = useState([]);
   const [livesLeft, setLivesLeft] = useState(3);
   const [freezeTime, setFreezeTime] = useState(false);
   const [freezeAnswer, setFreezeAnswer] = useState(false);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
   const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
   const [answerColor, setAnswerColor] = useState("");
   const [pointerEvents, setPointerEvents] = useState("");
   const [streak, setStreak] = useState(0);
   const [points, setPoints] = useState(0);
   const [backgroundImage, setBackgroundImage] = useState("");
   const [freezePowerUp, setFreezePowerUp] = useState(3);
   const [skipPowerUp, setSkipPowerUp] = useState(3);
   const [fiftyFifty, setFiftyFifty] = useState(3);
   const { allCategories, difficulty, userHighscore, setUserHighscore } =
      useContext(AuthContext);

   // fetch Questions
   useEffect(() => {
      const fetchQuestions = async () => {
         const response = await getQuestions();
         // Parse options string to array
         const parsedQuestions = response.map((question) => ({
            ...question,
            options: Array.isArray(question.options)
               ? question.options
               : JSON.parse(question.options),
         }));
         setQuestions(parsedQuestions);
      };
  
      fetchQuestions();
   }, []);

   const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
   };

   // prevent refresh if streak is bigger than 1 ( game playing )
   useEffect(() => {
      const handleBeforeUnload = (event) => {
         event.preventDefault();
         event.returnValue = "";
      };
      if (streak >= 1) {
         window.addEventListener("beforeunload", handleBeforeUnload);
         return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
         };
      }
   }, [streak]);

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

      setFreezeAnswer(true); // Set freezeAnswer to true when an answer is clicked

      if (clickedAnswer !== correctAnswer) {
         setTimer(15);
         setAnswerColor("red");
         setStreak(0);
         setLivesLeft(livesLeft - 1);
      } else {
         setTimer(15);
         setAnswerColor("green");
         setPoints(points + newPoints);
         const newStreak = streak + 1;
         setStreak(newStreak);

         // Update power-ups based on streak
         if (newStreak % 10 === 0) {
            setFreezePowerUp(freezePowerUp + 1);
         }
         if (newStreak % 15 === 0) {
            setSkipPowerUp(skipPowerUp + 1);
         }
         if (newStreak % 20 === 0) {
            setFiftyFifty(fiftyFifty + 1);
         }
      }

      setTimeout(() => {
         setFreezeAnswer(false); // Reset freezeAnswer after the timeout
         if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
         } else {
            endGame();
         }
         setPointerEvents("");
         setClickedButtonIndex(null);
         setCorrectAnswerIndex(null);
         setAnswerColor("");
      }, 2000);
   };

   const endGame = () => {
      setTimer("Game over");
   };

   useEffect(() => {
      if (typeof allCategories === "undefined") {
         window.location.href = "/game";
      } else {
         const shuffledQuestions = shuffleArray([...questions]);
         const selectedCategories = allCategories?.map(
            (category) => category.name
         );
         if (difficulty !== "All" && difficulty !== " ") {
            const filteredQuestions = shuffledQuestions.filter(
               (question) =>
                  selectedCategories?.includes(question.category) &&
                  question.difficulty === difficulty
            );

            setQuestions(filteredQuestions);
         } else {
            const filteredQuestions = shuffledQuestions.filter((question) =>
               selectedCategories?.includes(question.category)
            );
            setQuestions(filteredQuestions);
         }
      }
   }, [allCategories, difficulty]);

   useEffect(() => {
      let intervalId;
      if (
         !freezeAnswer &&
         !freezeTime &&
         timer > 0 &&
         typeof timer === "number"
      ) {
         intervalId = setInterval(() => {
            setTimer((prevTimer) =>
               prevTimer === 0 ? "Time is over" : prevTimer - 1
            );
         }, 1000);
      } else if (!freezeAnswer && !freezeTime && timer === 0) {
         endGame();
      }
      return () => clearInterval(intervalId);
   }, [freezeAnswer, freezeTime, timer]);

   useEffect(() => {
      if (questions.length > 0) {
         setBackgroundImage(questions[currentQuestionIndex]?.background);
      }
   }, [currentQuestionIndex, questions]);

   useEffect(() => {
      let timeoutId;
      if (freezeTime) {
         timeoutId = setTimeout(() => {
            setFreezeTime(false);
         }, 510000);
      }
      return () => clearTimeout(timeoutId);
   }, [freezeTime]);

   useEffect(() => {
      if (livesLeft === 0) {
         endGame();
      }
   }, [livesLeft]);

   const resetGame = () => {
      setTimer(15);
      setLivesLeft(3);
      setPoints(0);
      setCurrentQuestionIndex(0);
      setStreak(0);
      setQuestions(shuffleArray([...questions]));
      setFreezePowerUp(3);
      setSkipPowerUp(3);
      setFiftyFifty(3);
   };

   const getButtonColor = (index) => {
      if (index === clickedButtonIndex) {
         return answerColor;
      } else if (index === correctAnswerIndex && answerColor === "red") {
         return "orange";
      } else {
         return "";
      }
   };

   return (
      <div className="playgame">
         <div
            style={{
               background: `url(${backgroundImage})`,
            }}
            className={
               !freezeTime ? "playgame-wrapper" : "playgame-game-frozenwrapper"
            }
         >
            {freezeTime && <img src={Icycle} alt="" className="icycle" />}
            <div className="header">
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
               <div>
                  <div className="lives">
                     {Array.from({ length: 3 }).map((_, i) => (
                        <div
                           key={i}
                           className={`life ${i >= livesLeft ? "empty" : ""}`}
                        >
                           <FaHeart
                              color={i >= livesLeft ? "gray" : "red"}
                              size="35"
                           />
                        </div>
                     ))}
                  </div>
                  <div
                     className={
                        !freezeAnswer && !freezeTime ? "timer" : "frozen"
                     }
                  >
                     {timer}
                  </div>
               </div>
               {timer !== "Game over" && livesLeft > 0 ? (
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
                           if (skipPowerUp > 0) {
                              setSkipPowerUp(skipPowerUp - 1);
                              setCurrentQuestionIndex(currentQuestionIndex + 1);
                           }
                        }}
                        style={
                           skipPowerUp <= 0 ? { pointerEvents: "none" } : {}
                        }
                        className="power-up pu-2"
                     >
                        <img src={skip} alt="" />
                        <p>({skipPowerUp}/3)</p>
                     </div>
                     <div className="power-up pu-3">
                        <img src={fifty} alt="" />
                        <p>({fiftyFifty}/3)</p>
                     </div>
                  </div>
               ) : (
                  <div className="powerups"></div>
               )}
            </div>
            {timer !== "Game over" && livesLeft > 0 ? (
               <div className="question-section">
                  <div className="question">
                     <div className="main-question-div">
                        <div className="questionAndFlag">
                           <div className="question-text">
                              <div
                                 className="diff"
                                 style={{
                                    color:
                                       questions[currentQuestionIndex]
                                          ?.difficulty === "Easy"
                                          ? "#239342"
                                          : questions[currentQuestionIndex]
                                               ?.difficulty === "Medium"
                                          ? "#007ACC"
                                          : "#E03B2E",
                                 }}
                              >
                                 {questions[currentQuestionIndex]?.difficulty}
                                 {" - "}
                                 {questions[currentQuestionIndex]?.points}{" "}
                                 points
                              </div>

                              {questions[currentQuestionIndex]?.question}
                           </div>

                           {questions[currentQuestionIndex]?.image ===
                           "null" ? (
                              ""
                           ) : (
                              <div className="flag">
                                 <img
                                    height="120px"
                                    width="150px"
                                    src={questions[currentQuestionIndex]?.image}
                                    alt=""
                                 />
                              </div>
                           )}
                        </div>
                     </div>
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
               <div className="playagainbtn">
                  <button onClick={() => resetGame()}>Play again</button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Playgame;
