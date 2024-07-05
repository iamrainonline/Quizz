import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
   createPost,
   deletePost,
   updatePost,
   getPosts,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/getPosts", getPosts);
router.post("/createPost", createPost);
router.delete("/deletePost", deletePost);
router.put("/updatePost", updatePost);

export default router;
