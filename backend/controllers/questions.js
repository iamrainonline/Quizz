// get users
import { db } from "../db.js";

export const getQuestions = (req, res) => {
   const q = "SELECT * FROM  questions ORDER BY id DESC";

   db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
   });
};
