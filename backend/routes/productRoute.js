import express from "express";
import { addProduct, getProduct, removeProduct, updateProduct } from "../controllers/productController.js";
import { isAuthenticate } from "../middleware/retailAuth.js";

const productRouter = express.Router();

productRouter.post("/add",isAuthenticate, addProduct);
productRouter.put("/update/:id", isAuthenticate, updateProduct);
productRouter.get("/my/product", isAuthenticate, getProduct);
productRouter.delete("/delete", isAuthenticate, removeProduct);


export default productRouter;