import React, { useState } from "react";
import "../SCSS/Game.scss";
const Game = () => {
   const [categories, setCategories] = useState({
      Math: false,
      Geography: false,
      History: false,
   });

   const [difficulty, setDifficulty] = useState(1);

   const handleCheckboxChange = (category) => {
      setCategories((prevCategories) => ({
         ...prevCategories,
         [category]: !prevCategories[category],
      }));
   };

   const handleSliderChange = (e) => {
      setDifficulty(e.target.value);
   };

   return (
      <div className="app-container">
         <div className="dashboard">
            <div className="account-stats">
               <h2>Account Stats</h2>
               <ul>
                  <li>Records</li>
                  <li>Friends</li>
                  <li>Settings</li>
                  <li>Logout</li>
               </ul>
            </div>
            <div className="filters">
               <h2>Filters</h2>
               <div className="categories">
                  <h3>Categories</h3>
                  {Object.keys(categories).map((category) => (
                     <div key={category} className="category-item">
                        <input
                           type="checkbox"
                           checked={categories[category]}
                           onChange={() => handleCheckboxChange(category)}
                        />
                        <label>{category}</label>
                     </div>
                  ))}
               </div>
               <div className="difficulty">
                  <h3>Difficulty</h3>
                  <input
                     type="range"
                     min="1"
                     max="4"
                     value={difficulty}
                     onChange={handleSliderChange}
                     className="slider"
                  />
                  <div className="difficulty-labels">
                     <span>Easy</span>
                     <span>Medium</span>
                     <span>Hard</span>
                     <span>Savant</span>
                  </div>
               </div>
               <button
                  className="apply-button"
                  onClick={() => console.log("Apply Filters")}
               >
                  Apply
               </button>
            </div>
         </div>
         <div className="game-container">Let the game begin</div>
      </div>
   );
};

export default Game;
