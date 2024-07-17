import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/questions.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const corsConfig = {
   origin: ["http://localhost:3000", "http://192.168.1.132:3000", "*"],
   credentials: true,
   methods: "GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH",
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

app.listen(8800, () => {
   console.log("connected express PORT:", 8800, " [Success]");
});
