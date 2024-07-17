import express from "express";
import { getQuestions } from "../controllers/questions.js";

const router = express.Router();

router.get("/getQuestions", getQuestions);

export default router;
