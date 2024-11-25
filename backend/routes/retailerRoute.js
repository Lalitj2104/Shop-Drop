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
} from "../controllers/retailerController.js";

import { isAuthenticated } from "../middleware/isAuth.js";
import {
	addProduct,
	getProduct,
	removeProduct,
	updateProduct,
} from "../controllers/productController.js";

const retailerRouter = express.Router();

retailerRouter.post("/retailerRegister", registerRetailer);
retailerRouter.post("/verify/:id", verify);
retailerRouter.get("/resend/:id", resendOtp);
retailerRouter.post("/retailerLogin", loginRetailer);
retailerRouter.post("/login/verify/:id", verifyLogin);
retailerRouter.get("/login/resend/:id", resendLoginOtp);
retailerRouter.put("/changePassword", isAuthenticated, changePassword);
retailerRouter.post("/forgot", forgotPassword);
retailerRouter.put("/reset/:id", isAuthenticated, resetPassword);
retailerRouter.delete("/delete", isAuthenticated, deleteRetailer);

retailerRouter.get("/profile", isAuthenticated, getRetailerProfile);
retailerRouter.put(
	"/retailer/profile/update",
	isAuthenticated,
	updateRetailerProfile
);

retailerRouter.get(
	"/retailer/products/:id",
	isAuthenticated,
	getRetailerProducts
);
retailerRouter.post("/logout", isAuthenticated, logoutRetailer);

retailerRouter.post("/product/add", isAuthenticated, addProduct);
retailerRouter.put("/product/update/:id", isAuthenticated, updateProduct);
retailerRouter.get("/my/product", isAuthenticated, getProduct);
retailerRouter.delete("/product/delete", isAuthenticated, removeProduct);

export default retailerRouter;
