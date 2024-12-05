import express from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
import { addToCart, clearCart, getCart, updateCart } from "../controllers/cartController.js";

const cartRouter=express.Router();

cartRouter.post("/add/:id",isAuthenticated,addToCart);
cartRouter.put("/update",isAuthenticated,updateCart);
cartRouter.get("/myCart",isAuthenticated,getCart);
cartRouter.delete("/delete",isAuthenticated,clearCart);

export default cartRouter;