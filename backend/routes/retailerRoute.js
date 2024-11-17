import express from "express";
import {
  deleteRetailer,
  getRetailerProducts,
  getRetailerProfile,
  loginRetailer,
  logoutRetailer,
  registerRetailer,
  resendLoginOtp,
  updateRetailerProfile,
  verify,
  verifyLogin,
} from "../controllers/retailerController";
import {
  changePassword,
  forgotPassword,
  resendOtp,
  resetPassword,
} from "../controllers/userController";
import isAuthenticated from "../middleware/isAuth";
import {
  addProduct,
  getProduct,
  removeProduct,
  updateProduct,
} from "../controllers/productController";

retailerRouter = express.Router();

retailerRouter.post("/register", registerRetailer);
retailerRouter.post("/verify/:id", verify);
retailerRouter.get("/resend/:id", resendOtp);
retailerRouter.post("/login", loginRetailer);
retailerRouter.post("/login/verify/:id", verifyLogin);
retailerRouter.get("/login/resend/:id", resendLoginOtp);
retailerRouter.put("/changePassword", isAuthenticated, changePassword);
retailerRouter.post("/forgot", forgotPassword);
retailerRouter.put("/reset", isAuthenticated, resetPassword);
retailerRouter.delete("/delete", isAuthenticated, deleteRetailer);

retailerRouter.get("/my/profile", isAuthenticated, getRetailerProfile);
retailerRouter.put(
  "/my/profile/update",
  isAuthenticated,
  updateRetailerProfile
);

retailerRouter.get("/my/products/:id", isAuthenticated, getRetailerProducts);
retailerRouter.post("/logout", isAuthenticated, logoutRetailer);

retailerRouter.post("/product/add", isAuthenticated, addProduct);
retailerRouter.put("/product/update/:id", isAuthenticated, updateProduct);
retailerRouter.get("/my/product", isAuthenticated, getProduct);
retailerRouter.delete("/product/delete", isAuthenticated, removeProduct);
