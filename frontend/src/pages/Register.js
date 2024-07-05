import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
   const [inputs, setInputs] = useState({
      username: "",
      email: "",
      password: "",
   });

   const [err, setError] = useState(null);

   const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post("/auth/register", inputs);
         console.log(response);
      } catch (err) {
         console.log(err);
         setError(err.response.data);
      }
   };
   return (
      <div className="auth">
         <h1>Register</h1>
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
               type="text"
               placeholder="email"
               name="email"
               onChange={handleChange}
            />
            <input
               required
               type="password"
               placeholder="password"
               name="password"
               onChange={handleChange}
            />
            <button onClick={handleSubmit}>Register</button>
            <br />
            {err && <p className="error">{err}</p>}
            <span className="alreadyacc">
               Already have an account?
               <br />
               <br />
               <Link to="/login">Login</Link>
            </span>
         </form>
      </div>
   );
};

export default Register;
