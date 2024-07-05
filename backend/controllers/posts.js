import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
   const q =
      "SELECT P.content, P.title, P.id AS postID, u.id as userId, u.email, u.isAdmin, u.username FROM  posts P INNER JOIN users U on P.userId = U.id order by P.id DESC";

   db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
   });
};

export const createPost = (req, res) => {
   const q =
      "INSERT INTO posts(`title`,`content`,  `category`,`userId`) VALUES (?)";
   const values = [
      req.body.title,
      req.body.content,
      req.body.category,
      req.body.userId,
   ];

   db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("Post has been created with success");
   });
};

export const deletePost = (req, res) => {
   const token = req.cookies.jwt;
   const postId = req.body.postId;
   if (!token) return res.status(401).json("Not authenticated");
   jwt.verify(token, "SecretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";
      db.query(q, [postId, userInfo.id], (err, data) => {
         if (data.affectedRows === 0) {
            return res.status(403).json("You can delete only your post!");
         }
         return res.json("Post has been deleted");
      });
   });
};

export const updatePost = (req, res) => {
   const token = req.cookies.jwt;
   if (!token) return res.status(401).json("Not authenticated");

   jwt.verify(token, "SecretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q = "UPDATE posts SET `comment`=? WHERE `id` = ? AND `userId` = ?";
      const values = req.body.data.post;

      db.query(q, [values, req.body.data.postId, userInfo.id], (err, data) => {
         if (err) return res.status(500).json(err);
         return res.json("Post has been updated");
      });
   });
};
