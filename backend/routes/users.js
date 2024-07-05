import express from "express";
import { getUsers, deleteUser, createUser } from "../controllers/users.js";

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/createUser", createUser);
router.delete("/deleteUser", deleteUser);

export default router;
