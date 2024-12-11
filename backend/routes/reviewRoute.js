import express from "express";

import {
	addReview,
	deleteReview,
	getAllReviewsByUser,
	getAllReviewsForProduct,
	getReview,
	updateReview,
} from "../controllers/reviewController.js";
import { isAuthenticated } from "../middleware/isAuth.js";


export const reviewRouter = express.Router();

reviewRouter.post("/add/:productId", isAuthenticated, addReview);
reviewRouter.get("/get:id", isAuthenticated, getReview);
reviewRouter.put("/update/:id", isAuthenticated, updateReview);
reviewRouter.delete("/delete/:id", isAuthenticated, deleteReview);
reviewRouter.get("/all/:productId", isAuthenticated, getAllReviewsForProduct);
reviewRouter.get("/all/userReview/:id", isAuthenticated, getAllReviewsByUser);