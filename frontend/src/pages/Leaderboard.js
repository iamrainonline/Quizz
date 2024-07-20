import React, { useState, useEffect, useContext } from "react";
import { FaTrophy, FaMedal } from "react-icons/fa"; // Import icons from react-icons
import "../SCSS/Leaderboard.scss";
import { AuthContext } from "../context/authContext";
import { getAllUserHighscores } from "../API/users";
import moment from "moment";

const Leaderboard = () => {
   const [leaderboardData, setLeaderboardData] = useState([]);

   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getAllUserHighscores();
            // Sort the data based on points in descending order
            const sortedData = response.sort((a, b) => b.score - a.score);
            setLeaderboardData(sortedData);
         } catch (error) {
            console.log("error getting all the users highscores", error);
         }
      };
      fetchData();
   }, []);

   return (
      <div className="leaderboard">
         <h2>Leaderboard</h2>
         <div className="leaderboard-table">
            <div className="leaderboard-header">
               <div className="header-rank">#</div>
               <div className="header-name">Player Name</div>
               <div className="header-points">Points</div>
               <div className="header-date">Date</div>
            </div>
            <div className="leaderboard-body">
               {leaderboardData.map((player, index) => (
                  <div className="leaderboard-row" key={index}>
                     <div className="rank">
                        {index === 0 && <FaTrophy className="gold-icon" />}
                        {index === 1 && <FaMedal className="silver-icon" />}
                        {index === 2 && <FaMedal className="bronze-icon" />}
                        {index > 2 && <span>{index + 1}</span>}
                     </div>
                     <div
                        className="name"
                        style={{
                           color:
                              player.username === currentUser.username
                                 ? "gold"
                                 : "white",
                           fontWeight: "bold",
                        }}
                     >
                        {player.username}
                     </div>
                     <div className="points">{player.score}</div>
                     <div className="date">
                        {moment(player.date).startOf("hour").fromNow()}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Leaderboard;
