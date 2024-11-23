import express from "express";
import { addProduct } from "../controllers/productController.js";
import { isAuthenticated } from "../middleware/isAuth.js";

const productRouter = express.Router();

productRouter.post("/addProduct",isAuthenticated, addProduct);

export default productRouter;