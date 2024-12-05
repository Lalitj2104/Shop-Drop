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
	myProfile,
	registerUser,
	removeAddress,
	resendOtp,
	resetPassword,
	setDefaultAddress,
	updateUserProfile,
	verifyUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuth.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify/:id", verifyUser);
userRouter.get("/resend/:id", resendOtp);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-Password", forgotPassword);
userRouter.post("/reset/:id", resetPassword);
userRouter.put("/change-Password/:id", changePassword);
userRouter.get("/me",isAuthenticated,myProfile);
userRouter.get("/my/profile", isAuthenticated, getUserProfile);
userRouter.put("/my/profile/update", isAuthenticated, updateUserProfile);
userRouter.post("/logout", logoutUser);
userRouter.delete("/delete/me", deleteUser);

userRouter.post("/address/add", isAuthenticated, addAddress);
userRouter.get("/address/my", isAuthenticated, getAllAddress);
userRouter.put("/address/default", isAuthenticated, setDefaultAddress);
userRouter.delete("/address/remove", isAuthenticated, removeAddress);



export default userRouter;
