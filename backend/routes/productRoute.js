import express from "express";
import { addProduct, getAllProducts, getProduct, getProducts, removeProduct, updateProduct } from "../controllers/productController.js";
import { isAuthenticate } from "../middleware/retailAuth.js";
import { isAuthenticated } from "../middleware/isAuth.js";
const productRouter = express.Router();

productRouter.post("/add",isAuthenticate, addProduct);
productRouter.put("/update/:id", isAuthenticate, updateProduct);
productRouter.get("/products/:id", isAuthenticate, getAllProducts);
productRouter.get("/detail/:id",isAuthenticated,getProduct);
productRouter.delete("/delete/:id", isAuthenticate, removeProduct);

productRouter.get("/all",getProducts);



export default productRouter;