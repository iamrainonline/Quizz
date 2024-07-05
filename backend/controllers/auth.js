import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register
export const register = (req, res) => {
   // CHECK EXISTING USER
   const q = "SELECT * FROM users WHERE email = ? OR username = ?";

   db.query(q, [req.body.email, req.body.name], (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User already exists");

      // Hash the password and create an user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];

      db.query(q, [values], (err, data) => {
         if (err) return res.json(err);
         return res.json("User has been created");
      });
   });
};

//login
export const login = (req, res) => {
   // CHECK USER
   const q = "SELECT * FROM users WHERE username = ?";

   db.query(q, [req.body.username], (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0)
         return res.status(404).json("This user does not exist ");

      // check password
      const isPasswordCorrect = bcrypt.compareSync(
         req.body.password,
         data[0].password
      );
      if (!isPasswordCorrect)
         return res.status(400).json("Wrong username or password");

      // JWT
      const token = jwt.sign({ id: data[0].id }, "SecretKey");
      const { password, ...other } = data[0];

      // JWT Cookie
      res.cookie("jwt", token, {
         httpOnly: true,
      })
         .status(200)
         .json(other);
   });
};

//logout
export const logout = (req, res) => {
   res.clearCookie("jwt", {
      sameSite: "none",
      secure: true,
   })
      .status(200)
      .json("User has been logged out");
};
