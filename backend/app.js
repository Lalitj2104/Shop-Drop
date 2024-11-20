import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/", (req, res) => {
	res.send("your server is active");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

export default app;
