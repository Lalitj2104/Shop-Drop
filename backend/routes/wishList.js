import express from "express";
import { isAuthenticated } from "../middleware/isAuth";
import { addWish, deleteWish, getWish, updateWish } from "../controllers/userController";


const wishListRouter=express.Router();

wishListRouter.post("/add",isAuthenticated,addWish);
wishListRouter.put("/update",isAuthenticated,updateWish);
wishListRouter.get("/my/wishlist",isAuthenticated,getWish);
wishListRouter.delete("/delete",isAuthenticated,deleteWish);

export default wishListRouter;