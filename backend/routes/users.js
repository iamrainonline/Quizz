import express from "express";
import {
   getUsers,
   deleteUser,
   createUser,
   getUsersHighscore,
   setUserHighscore,
} from "../controllers/users.js";

const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/getUsersHighscore", getUsersHighscore);
router.post("/setUserHighscore", setUserHighscore);
router.post("/createUser", createUser);
router.delete("/deleteUser", deleteUser);

export default router;
