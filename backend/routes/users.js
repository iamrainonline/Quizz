import express from "express";
import {
   getUsers,
   deleteUser,
   createUser,
   getUserHighscore,
   createUserHighscore,
   updateUserHighscore,
   getAllUserHighscores,
} from "../controllers/users.js";

const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/getAllUserHighscores", getAllUserHighscores);
router.post("/getUserHighscore", getUserHighscore);
router.post("/createUserHighscore", createUserHighscore);
router.put("/updateUserHighscore", updateUserHighscore);
router.post("/createUser", createUser);
router.delete("/deleteUser", deleteUser);

export default router;
