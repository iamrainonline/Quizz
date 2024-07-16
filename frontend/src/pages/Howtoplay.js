import React from "react";
import {
   FaHeart,
   FaSnowflake,
   FaArrowRight,
   FaStar,
   FaSkull,
   FaRedo,
   FaBolt,
} from "react-icons/fa";
import "../SCSS/Howtoplay.scss";

const Howtoplay = () => {
   return (
      <div className="howtoplay">
         <h2>How to Play</h2>
         <div className="howtoplay-card">
            <ul className="howtoplay-list">
               <li>
                  <FaHeart className="icon" color="red" />
                  <div>
                     <b>You have 3 lives:</b> You start with three lives. If you
                     answer incorrectly, you lose a life. Lose all three lives,
                     and it's game over.
                  </div>
               </li>
               <li>
                  <FaStar className="icon" />
                  <div>
                     <b>Points:</b>
                     <ul>
                        <li>
                           Easy question:{" "}
                           <span className="points">10 points</span>
                        </li>
                        <li>
                           Medium question:{" "}
                           <span className="points">15 points</span>
                        </li>
                        <li>
                           Hard question:{" "}
                           <span className="points">20 points</span>
                        </li>
                     </ul>
                     Accumulate points to climb up the leaderboards!
                  </div>
               </li>
               <li>
                  <FaBolt className="icon" color="#007ACC" />
                  <div>
                     <b>Streak Rewards:</b> Keep answering correctly to build a
                     streak and earn rewards:
                     <ul>
                        <li>
                           10 streak:{" "}
                           <span className="reward">Freeze Time power-up</span>
                        </li>
                        <li>
                           15 streak:
                           <span className="reward">Skip Question</span>
                        </li>
                        <li>
                           20 streak:{" "}
                           <span className="reward">50/50 power-up</span>
                        </li>
                     </ul>
                  </div>
               </li>
               <li>
                  <FaSnowflake className="icon" color="#007ACC" />
                  <div>
                     <b>Freeze Time:</b> Use this power-up to stop the timer for
                     10 seconds. This can be stacked for strategic advantage.
                  </div>
               </li>
               <li>
                  <FaArrowRight className="icon" />
                  <div>
                     <b>Skip Question:</b> Not sure about a question? Use the
                     Skip Question button to move on to the next one. You have 3
                     skips available.
                  </div>
               </li>
               <li>
                  <FaArrowRight className="icon" />
                  <div>
                     <b>50/50 Button:</b> Remove two incorrect answers with this
                     power-up, giving you a better chance of choosing the right
                     answer. You can use this 3 times.
                  </div>
               </li>
               <li>
                  <FaRedo className="icon" />
                  <div>
                     <b>When you lose:</b> Don't worry! If you lose, your
                     power-ups will reset to 3 each, and you can try again.
                  </div>
               </li>
               <li>
                  <FaSkull className="icon" color="#E23C2F" />
                  <div>
                     <b>Good luck!</b> Have fun and aim for the highest score!
                  </div>
               </li>
            </ul>
            <button className="playbtn">PLAY</button>
         </div>
      </div>
   );
};

export default Howtoplay;
