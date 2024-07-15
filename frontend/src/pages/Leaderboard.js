import React, { useState, useEffect } from "react";
import { FaTrophy, FaMedal } from "react-icons/fa"; // Import icons from react-icons
import "../SCSS/Leaderboard.scss";

const Leaderboard = () => {
   // Dummy data for leaderboard (replace with actual data from API or state)
   const [leaderboardData, setLeaderboardData] = useState([
      { rank: 1, name: "Bill Gates", points: 250, date: "21 July 2024" },
      { rank: 2, name: "Jane Smith", points: 220, date: "21 July 2024" },
      { rank: 3, name: "Alex Johnson", points: 200, date: "21 July 2024" },
      { rank: 4, name: "Emily Davis", points: 180, date: "21 July 2024" },
      { rank: 5, name: "Michael Brown", points: 160, date: "21 July 2024" },
      { rank: 6, name: "Ion Vasile", points: 130, date: "21 July 2024" },
      { rank: 7, name: "Ana Maria", points: 120, date: "21 July 2024" },
   ]);

   // Fetch leaderboard data from API or database
   useEffect(() => {
      // Example: fetchLeaderboardData()
      // Replace with actual fetch logic
      // fetchLeaderboardData().then(data => setLeaderboardData(data));
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
                  <div key={index} className="leaderboard-row">
                     <div className="rank">
                        {player.rank === 1 && (
                           <FaTrophy className="gold-icon" />
                        )}
                        {player.rank === 2 && (
                           <FaMedal className="silver-icon" />
                        )}
                        {player.rank === 3 && (
                           <FaMedal className="bronze-icon" />
                        )}
                        {player.rank > 3 && <span>{player.rank}</span>}
                     </div>
                     <div className="name">{player.name}</div>
                     <div className="points">{player.points}</div>
                     <div className="date">{player.date}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Leaderboard;
