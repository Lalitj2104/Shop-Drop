import express from "express";
import { addProduct, getAllProducts, getProduct, getProducts, removeProduct, updateProduct } from "../controllers/productController.js";
import { isAuthenticate } from "../middleware/retailAuth.js";

const productRouter = express.Router();

productRouter.post("/add",isAuthenticate, addProduct);
productRouter.put("/update/:id", isAuthenticate, updateProduct);
productRouter.get("/my/products", isAuthenticate, getAllProducts);
productRouter.get("/my/product/:id",isAuthenticate,getProduct);
productRouter.delete("/delete/:id", isAuthenticate, removeProduct);

productRouter.get("/all",getProducts);



export default productRouter;