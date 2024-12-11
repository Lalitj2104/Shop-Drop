import express from "express"
import { loginAdmin, signOut } from "../controllers/adminContoller.js";

export const adminRouter=express.Router();

adminRouter.post("/login",loginAdmin);
adminRouter.get("/logout",signOut);