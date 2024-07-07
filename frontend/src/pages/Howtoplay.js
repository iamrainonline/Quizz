import React from "react";
import "../SCSS/Howtoplay.scss";

const Howtoplay = () => {
   return (
      <div className="howtoplay">
         <h2>How to Play</h2>
         <ul className="howtoplay-list">
            <li>
               <b>You have 3 lives:</b> If you answer wrong, you lose a life.
            </li>
            <li>
               <b>Points:</b> An easy question is worth 10 points, medium 15
               points, and hard 20 points. Points only count for leaderboards
            </li>
            <li>
               <b>Streak Rewards:</b>
               <ul>
                  <li>At 10 streak, you win a freeze time.</li>
                  <li>At 20 streak, you win a life.</li>
                  <li>At 30 streak, you win a 50/50.</li>
               </ul>
            </li>
            <li>
               <b>Freeze Time: </b> A freeze time will stop the timer for 10
               seconds. (Freeze time can stack)
            </li>
            <li>
               <b>Skip Question:</b> You have the Skip question button that will
               skip the current question. You have 3 skips.
            </li>
            <li>
               <b>50/50 Button:</b> This button will remove two random incorrect
               answers. You have 3 uses.
            </li>
            <li>
               <b>When you lose:</b> Your stop time, skip question, and 50/50
               reset to 3/3 each.
            </li>
            <li>
               <b>Good luck!</b>
            </li>
         </ul>
      </div>
   );
};

export default Howtoplay;
