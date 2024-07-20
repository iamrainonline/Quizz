import React, { useState, useEffect, useContext } from "react";
import { Link, useHref, useNavigate } from "react-router-dom";
import "../SCSS/Game.scss";
import Geography from "../images/earth.png";
import History from "../images/history.png";
import Einstein from "../images/einstein.png";
import Science from "../images/science.JPG";
import Sports from "../images/sports.png";
import Cinema from "../images/cinema.jpg";
import { AuthContext } from "../context/authContext";
import { createUserHighscore, getUserHighscore } from "../API/users";

const Game = () => {
   const initialCategories = [
      {
         name: "Geography",
         img: Geography,
         clicked: false,
      },
      {
         name: "History",
         img: History,
         clicked: false,
      },
      {
         name: "Science",
         img: Science,
         clicked: false,
      },
      {
         name: "Sports",
         img: Sports,
         clicked: false,
      },
      {
         name: "Cinema",
         img: Cinema,
         clicked: false,
      },
      {
         name: "General",
         img: Einstein,
         clicked: false,
      },
   ];
   const [category, setCategory] = useState(initialCategories);
   const [categoriesSelected, setCategoriesSelected] = useState(false);

   const {
      allCategories,
      setAllCategories,
      difficulty,
      setDifficulty,
      currentUser,
      userHighscore,
      setUserHighscore,
   } = useContext(AuthContext);

   const handleSelect = (e) => {
      setDifficulty(e.target.value);
   };
   const navigate = useNavigate();

   const handleCategoryClick = (index) => {
      const updatedCategories = category.map((cat, idx) => {
         if (idx === index) {
            return { ...cat, clicked: !cat.clicked };
         }
         return cat;
      });
      setCategory(updatedCategories);

      // Check if any category is selected
      const anySelected = updatedCategories.some((cat) => cat.clicked);
      setCategoriesSelected(anySelected);

      // Update state based on selection
      const selectedCats = updatedCategories.filter((cat) => cat.clicked);
      setAllCategories(selectedCats);
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getUserHighscore(currentUser.user_id);
            setUserHighscore(response[0]);
         } catch (error) {
            console.log("cannot fetch user highscore", error);
         }
      };
      fetchData();
   }, []);

   const handlePlay = async () => {
      try {
         console.log(userHighscore);
         if (userHighscore === undefined) {
            const response = await createUserHighscore(currentUser.user_id, 0);
            setUserHighscore(0);
            navigate("/Playgame");
         } else {
            navigate("/Playgame");
         }
      } catch (error) {
         console.error("Failed to set highscore:", error);
      }
   };

   return (
      <div className="game-container">
         <div className="game-wrapper">
            <div className="categories">
               <h1>Difficulty & Categories</h1>

               <div className="category-list">
                  {category.map((cat, index) => (
                     <div key={cat.name} className={cat.name}>
                        <div
                           className={
                              cat.clicked ? cat.name : cat.name + " greyout"
                           }
                           onClick={() => handleCategoryClick(index)}
                        >
                           <img src={cat.img} alt={cat.name} />
                        </div>
                        <p className="catname">
                           {cat.name}
                           <input
                              type="checkbox"
                              checked={cat.clicked}
                              onChange={() => {}}
                           />
                        </p>
                     </div>
                  ))}
               </div>

               <div className="play-btn">
                  <div className="dropdown-container">
                     <select
                        className="dropdown"
                        value={difficulty}
                        onChange={handleSelect}
                     >
                        <option disabled value="">
                           Select difficulty
                        </option>
                        <option value="All">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option
                           value="Hardcore"
                           style={{
                              backgroundColor: "red",
                              padding: "2px",
                           }}
                        >
                           Hardcore 💀
                        </option>
                     </select>
                  </div>
                  {categoriesSelected && (
                     <button onClick={handlePlay}>Play</button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Game;
