import React, { useState, useEffect } from "react";
import "../SCSS/Game.scss";
import Geography from "../images/earth.png";
import History from "../images/history.png";
import Einstein from "../images/einstein.png";
import Science from "../images/science.JPG";
import Sports from "../images/sports.JPG";

const Game = () => {
   const initialCategories = [
      {
         name: "geography",
         img: Geography,
         clicked: false,
      },
      {
         name: "history",
         img: History,
         clicked: false,
      },
      {
         name: "science",
         img: Science,
         clicked: false,
      },
      {
         name: "sports",
         img: Sports,
         clicked: false,
      },
      {
         name: "everything",
         img: Einstein,
         clicked: false,
      },
   ];

   const [category, setCategory] = useState(initialCategories);

   const handleCategoryClick = (index) => {
      const updatedCategories = category.map((cat, idx) => {
         if (idx === index) {
            return { ...cat, clicked: !cat.clicked };
         }
         return cat;
      });
      setCategory(updatedCategories);
   };
   return (
      <div className="game-container">
         <div className="game-wrapper">
            <div className="categories">
               <h1>Select your Categories!</h1>
               <div className="category-list">
                  {category.map((cat, index) => (
                     <div key={cat.name} className={cat.name}>
                        <div
                           className={
                              !cat.clicked ? cat.name : cat.name + " greyout"
                           }
                           onClick={() => handleCategoryClick(index)}
                        >
                           <img src={cat.img} alt={cat.name} />
                        </div>
                     </div>
                  ))}
               </div>
               <div className="play-btn">
                  <button>Play</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Game;
