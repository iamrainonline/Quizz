import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// create user

export const createUser = (req, res) => {
   // CHECK EXISTING USER
   const q = "SELECT * FROM users WHERE email = ? OR username = ?";

   db.query(q, [req.body.email, req.body.name], (err, data) => {
      if (err) return res.json(err);
      if (data.length)
         return res.status(409).json("User or email already exists");

      // Hash the password and create an user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
         "INSERT INTO users(`username`,`email`,`password`,`isAdmin`) VALUES (?)";
      const values = [req.body.name, req.body.email, hash, req.body.isAdmin];

      db.query(q, [values], (err, data) => {
         if (err) return res.json(err);
         return res.json("User has been created");
      });
   });
};
// get users
export const getUsers = (req, res) => {
   const q = "SELECT * FROM  users ORDER BY id DESC";

   db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
   });
};

export const deleteUser = (req, res) => {
   const token = req.cookies.jwt;
   const userId = req.body.userId;
   if (!token) return res.status(401).json("Not authenticated");

   jwt.verify(token, "SecretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q = "DELETE FROM users  WHERE `id` = ?";
      db.query(q, [userId], (err, data) => {
         if (data.affectedRows === 0) {
            return res.status(403).json("User was not deleted!");
         }
         return res.json("User has been deleted");
      });
   });
};

// get users highscore
export const getUsersHighscore = (req, res) => {
   const q = "SELECT * FROM  highscores ORDER BY id DESC";

   db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
   });
};

// set users highscore

export const setUserHighscore = (req, res) => {
   const { userId, score } = req.body.data;

   const q = "INSERT INTO highscores(`score`,`userId`) VALUES (?)";
   const values = [score, userId];

   db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("Highscore saved successfully");
   });
};
