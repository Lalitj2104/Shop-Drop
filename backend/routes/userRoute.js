import express from "express";
import {
	addAddress,
	changePassword,
	deleteUser,
	forgotPassword,
	getAllAddress,
	getUserProfile,
	loginUser,
	logoutUser,
	registerUser,
	removeAddress,
	resendOtp,
	resetPassword,
	setDefaultAddress,
	updateUserProfile,
	verifyUser,
} from "../controllers/userController.js";
import {isAuthenticated} from "../middleware/isAuth.js";
import {
	addReview,
	deleteReview,
	getAllReviewsByUser,
	getAllReviewsForProduct,
	getReview,
	updateReview,
} from "../controllers/reviewController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify/:id", verifyUser);
userRouter.get("/resend/:id", resendOtp);
userRouter.post("/login", loginUser);
userRouter.post("/forgetPassword", forgotPassword);
userRouter.put("/reset/:id", resetPassword);
userRouter.put("/changePassword", isAuthenticated, changePassword);
userRouter.get("/my/profile", isAuthenticated, getUserProfile);
userRouter.put("/my/profile/update", isAuthenticated, updateUserProfile);
userRouter.post("/logout", logoutUser);
userRouter.delete("/delete/me", deleteUser);

userRouter.post("/add/address", isAuthenticated, addAddress);
userRouter.get("/my/address", isAuthenticated, getAllAddress);
userRouter.put("/default/address", isAuthenticated, setDefaultAddress);
userRouter.delete("/my/address", isAuthenticated, removeAddress);

userRouter.post("/add/review", isAuthenticated, addReview);
userRouter.get("/get/review/:id", isAuthenticated, getReview);
userRouter.put("/update/review", isAuthenticated, updateReview);
userRouter.delete("/delete/review", isAuthenticated, deleteReview);
userRouter.get("/all/reviews/:id", isAuthenticated, getAllReviewsForProduct);
userRouter.get("/all/userReview/:id", isAuthenticated, getAllReviewsByUser);

export default userRouter;