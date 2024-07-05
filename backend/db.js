import mysql from "mysql2";

export const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "quizzdb",
});

db.connect(function (err) {
   if (err) {
      console.error("Error connecting to database:", err);
      throw err;
   } else {
      console.log("Connected to MySQL Database [Success]");
   }
});
