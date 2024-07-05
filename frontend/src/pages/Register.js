import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
   const [inputs, setInputs] = useState({
      username: "",
      email: "",
      password: "",
      role: "user",
   });

   const [err, setError] = useState(null);
   const [response, setResponse] = useState(null);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = async (e) => {
      const trimmedPassword = inputs.password.trim();
      const checkSpaces = inputs.username;
      if (checkSpaces.includes(" ")) {
         setError("Username cannot contain empty spaces");
         return;
      }
      if (trimmedPassword === "") {
         setError("Password cannot have empty spaces");
         return;
      }
      if (
         inputs.username === "" ||
         inputs.email === "" ||
         trimmedPassword === ""
      ) {
         console.log(inputs);
         setError("All fields must be completed");
         return;
      }
      e.preventDefault();
      try {
         const response = await axios.post("/auth/register", inputs);
         setResponse(response.data);
         setError(null);
         setTimeout(() => {
            navigate("/login");
         }, 1000);
      } catch (err) {
         console.log(err);
         setResponse(null);
         setError(err.response.data);
      }
   };
   return (
      <div className="authwrapper">
         <div className="auth">
            <h1>Register</h1>
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
               {response && <p className="register-response">{response}</p>}
               <span className="alreadyacc">
                  Already have an account?
                  <br />
                  <br />
                  <Link to="/login">Login here</Link>
               </span>
            </div>
         </div>
      </div>
   );
};

export default Register;
