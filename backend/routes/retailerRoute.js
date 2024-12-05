import express from "express";
import {
	deleteRetailer,
	getRetailerProducts,
	getRetailerProfile,
	loginRetailer,
	logoutRetailer,
	registerRetailer,
	resendOtp,
	resendLoginOtp,
	updateRetailerProfile,
	verify,
	verifyLogin,
  changePassword,
  forgotPassword,
  resetPassword,
  myProfile,
} from "../controllers/retailerController.js";

import { isAuthenticate } from "../middleware/retailAuth.js"; 
import {
	addProduct,
	getProduct,
	removeProduct,
	updateProduct,
} from "../controllers/productController.js";

const retailerRouter = express.Router();


retailerRouter.get("/me",isAuthenticate,myProfile);
retailerRouter.post("/retailerRegister", registerRetailer);
retailerRouter.post("/verify/:id", verify);
retailerRouter.get("/resend/:id", resendOtp);
retailerRouter.post("/retailerLogin", loginRetailer);
retailerRouter.post("/login/verify/:id", verifyLogin);
retailerRouter.get("/login/resend/:id", resendLoginOtp);
retailerRouter.put("/change-Password/:id", isAuthenticate, changePassword);
retailerRouter.post("/forgot", forgotPassword);
retailerRouter.put("/reset/:id", isAuthenticate, resetPassword);
retailerRouter.delete("/delete", isAuthenticate, deleteRetailer);

retailerRouter.get("/profile", isAuthenticate, getRetailerProfile);
retailerRouter.put(
	"/retailer/profile/update",
	isAuthenticate,
	updateRetailerProfile
);

retailerRouter.get(
	"/retailer/products/:id",
	isAuthenticate,
	getRetailerProducts
);
retailerRouter.post("/logout", isAuthenticate, logoutRetailer);

export default retailerRouter;
