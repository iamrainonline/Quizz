import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHref, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { getUserHighscore } from "../API/users";

const Login = () => {
   const { currentUser, setCurrentUser, userHighscore, setUserHighscore } =
      useContext(AuthContext);

   const [inputs, setInputs] = useState({
      username: "",
      password: "",
   });
   const [err, setError] = useState(null);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post("/auth/login", inputs);
         console.log("Authentications: successful", response.data);
         localStorage.setItem("userData", JSON.stringify(response.data));
         setCurrentUser(response.data);
         navigate("/game");
      } catch (err) {
         console.log(err);
         setError(err.response.data);
      }
   };

   return (
      <div className="authwrapper">
         <div className="auth">
            <h1>Login</h1>

            <div className="form">
               <input
                  required
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={handleChange}
               />
               <input
                  required
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
               />
               <button onClick={handleSubmit}>Login</button>
               <span className="alreadyacc">
                  {err && <p>{err}</p>}
                  <br />
                  <Link to="/register">Register</Link>
               </span>
            </div>
         </div>
      </div>
   );
};

export default Login;
