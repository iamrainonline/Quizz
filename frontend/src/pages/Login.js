import { React, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
   const { currentUser, setCurrentUser } = useContext(AuthContext);

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
         navigate("/dashboard");
      } catch (err) {
         console.log(err);
         setError(err.response.data);
      }
   };
   return (
      <div className="auth">
         <h1>Login</h1>

         <form action="">
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
            <span>
               {err && <p>{err}</p>}
               <br />
               <Link to="/register">Register</Link>
            </span>
         </form>
      </div>
   );
};

export default Login;
