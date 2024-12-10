import express, { Router } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import retailerRouter from "./routes/retailerRoute.js";
import productRouter from "./routes/productRoute.js";
import wishListRouter from "./routes/wishList.js";
import cors from "cors";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";
import { reviewRouter } from "./routes/reviewRoute.js";
import { router } from "./routes/gameRoute.js";
import { adminRouter } from "./routes/adminRoute.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(
	cors({
		origin: [process.env.LOCAL_URL, process.env.WEB_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	})
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("your server is active");
});
app.use(router);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/retailer", retailerRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/wishList", wishListRouter);
app.use("/api/v1/order",orderRouter);
app.use("/api/v1/cart",cartRouter);
app.use("/api/v1/review",reviewRouter)
app.use("api/v1/admin",adminRouter);

export default app;
