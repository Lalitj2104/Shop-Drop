import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import retailerRouter from "./routes/retailerRoute.js";
import productRouter from "./routes/productRoute.js";
import wishListRouter from "./routes/wishList.js";
import cors from "cors"

dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/", (req, res) => {
	res.send("your server is active");
});

app.use(cors({
    origin:[process.env.LOCAL_URL,process.env.WEB_URL],
    methods:["GET","PUT","POST","PATCH","DELETE"],
    credentials:true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/retailer", retailerRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/wishList",wishListRouter);

export default app;
