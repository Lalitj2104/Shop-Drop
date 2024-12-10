import express from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
import { addWish, deleteWish, getWish, removeWish, updateWish } from "../controllers/userController.js";


const wishListRouter=express.Router();

wishListRouter.post("/add/:productId", isAuthenticated, addWish);
wishListRouter.put("/update/:id",isAuthenticated,updateWish);
wishListRouter.get("/my/wishlist",isAuthenticated,getWish);
wishListRouter.delete("/delete", isAuthenticated, deleteWish);

wishListRouter.delete("/remove/:productId", isAuthenticated, removeWish);



export default wishListRouter;