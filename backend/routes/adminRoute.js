import express from "express"
import { loginAdmin } from "../controllers/adminContoller.js";

export const adminRouter=express.Router();

adminRouter.post("/login",loginAdmin);