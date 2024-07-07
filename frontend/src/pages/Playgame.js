import React, { useEffect, useState } from "react";
import QuestionsAPI from "../API/Questions";
import "../SCSS/Playgame.scss";
import { FaHeart } from "react-icons/fa";
import fifty from "../images/fifty.jpg";
import freeztime from "../images/frozen_clock.png";
import skip from "../images/skip.jpg";

const Playgame = () => {
   const [timer, setTimer] = useState(2515);
   const [questions, setQuestions] = useState(QuestionsAPI);
   const [livesLeft, setLivesLeft] = useState(["life", "life", "life"]);
   const [freezeTime, setFreezTime] = useState(false);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [streak, setStreak] = useState(0);
   const [points, setPoints] = useState(0);

   const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
   };

   const guessQuestion = (clickedAnswer, correctAnswer, newpoints) => {
      if (clickedAnswer !== correctAnswer) {
         setStreak(0);
         setLivesLeft((prevLives) => {
            const newLives = [...prevLives];
            newLives.pop();
            return newLives;
         });
      } else {
         setPoints(points + newpoints);
         setTimer(2515);
         setStreak(streak + 1);
      }

      if (livesLeft.length <= 0) {
         setTimer("Game is over");
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
   };

   useEffect(() => {
      const shuffledQuestions = shuffleArray([...QuestionsAPI]);
      setQuestions(shuffledQuestions);
   }, []);

   useEffect(() => {
      let intervalId;
      if (!freezeTime && timer > 0 && typeof timer === "number") {
         intervalId = setInterval(() => {
            setTimer((prevTimer) => {
               if (prevTimer === 0) {
                  clearInterval(intervalId);
                  return "Time is over";
               }
               return prevTimer - 1;
            });
         }, 1000);
      } else if (!freezeTime && timer === 0) {
         setTimer("Time is over");
      }

      return () => clearInterval(intervalId);
   }, [freezeTime, timer]);

   useEffect(() => {
      if (freezeTime) {
         const timeoutId = setTimeout(() => {
            setFreezTime(false);
         }, 25000);

         return () => clearTimeout(timeoutId);
      }
   }, [freezeTime]);

   return (
      <div className="playgame">
         <div
            className={
               !freezeTime ? "playgame-wrapper" : "playgame-game-frozenwrapper"
            }
         >
            <div className="header">
               <div className="category-wrapper">
                  <li>
                     Category: <b>{questions[currentQuestionIndex].category}</b>
                  </li>
                  <li>
                     Current Points: <b>{points}</b>
                  </li>
                  <li>
                     Streak: <b>{streak}</b> in a row
                  </li>
               </div>
               <div className="powerups">
                  <div className="powerups-wrapper">
                     <p style={{ color: "#007ACC", fontWeight: "bold" }}>
                        Power ups
                     </p>
                     <div
                        className="power-up pu-1"
                        onClick={() => setFreezTime(!freezeTime)}
                     >
                        <img src={freeztime} alt="" />
                        <p>(3/3)</p>
                     </div>
                     <div className="power-up pu-2">
                        <img src={skip} alt="" />
                        <p>(3/3)</p>
                     </div>

                     <div className="power-up pu-3">
                        <img src={fifty} alt="" />
                        <p>(3/3)</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className={!freezeTime ? "timer" : "frozen"}>{timer}</div>
            {timer > -1 &&
            timer !== "Game is over" &&
            timer !== "Time is over" ? (
               <div className="question-section">
                  <div className="question">
                     <b
                        style={{
                           fontSize: "18px",
                           color:
                              questions[currentQuestionIndex].difficulty ===
                              "easy"
                                 ? "#22A6F2"
                                 : questions[currentQuestionIndex]
                                      .difficulty === "medium"
                                 ? "green"
                                 : questions[currentQuestionIndex]
                                      .difficulty === "hard"
                                 ? "#FFD700"
                                 : "black",
                        }}
                     >
                        {questions[currentQuestionIndex].difficulty}
                     </b>
                     <br />
                     {questions[currentQuestionIndex].question}
                  </div>
                  <div className="buttons">
                     <button
                        onClick={() =>
                           guessQuestion(
                              questions[currentQuestionIndex].options[0],
                              questions[currentQuestionIndex].correctAnswer,
                              questions[currentQuestionIndex].points
                           )
                        }
                     >
                        {questions[currentQuestionIndex].options[0]}
                     </button>
                     <button
                        onClick={() =>
                           guessQuestion(
                              questions[currentQuestionIndex].options[1],
                              questions[currentQuestionIndex].correctAnswer,
                              questions[currentQuestionIndex].points
                           )
                        }
                     >
                        {questions[currentQuestionIndex].options[1]}
                     </button>
                     <button
                        onClick={() =>
                           guessQuestion(
                              questions[currentQuestionIndex].options[2],
                              questions[currentQuestionIndex].correctAnswer,
                              questions[currentQuestionIndex].points
                           )
                        }
                     >
                        {questions[currentQuestionIndex].options[2]}
                     </button>
                     <button
                        onClick={() =>
                           guessQuestion(
                              questions[currentQuestionIndex].options[3],
                              questions[currentQuestionIndex].correctAnswer,
                              questions[currentQuestionIndex].points
                           )
                        }
                     >
                        {questions[currentQuestionIndex].options[3]}
                     </button>
                  </div>
                  <div className="lives">
                     {livesLeft.map((life, key) => (
                        <div key={key}>
                           <FaHeart color="red" size="25" />
                        </div>
                     ))}
                  </div>
               </div>
            ) : (
               <div className="play-again-btn">
                  <button
                     onClick={() => {
                        setTimer(10);
                        setLivesLeft(["life", "life", "life"]);
                        setPoints(0);
                     }}
                  >
                     Play again
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Playgame;
