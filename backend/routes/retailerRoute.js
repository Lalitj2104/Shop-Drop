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

retailerRouter.post("retailerRegister", registerRetailer);
retailerRouter.post("/retailer/verify/:id", verify);
retailerRouter.get("/retailer/resend/:id", resendOtp);
retailerRouter.post("/retailerLogin", loginRetailer);
retailerRouter.post("/retailer/login/verify/:id", verifyLogin);
retailerRouter.get("/retailer/login/resend/:id", resendLoginOtp);
retailerRouter.put("/retailer/changePassword", isAuthenticated, changePassword);
retailerRouter.post("/retailer/forgot", forgotPassword);
retailerRouter.put("/retailer/reset", isAuthenticated, resetPassword);
retailerRouter.delete("/retailer/delete", isAuthenticated, deleteRetailer);

retailerRouter.get("/retailer/profile", isAuthenticated, getRetailerProfile);
retailerRouter.put(
  "/retailer/profile/update",
  isAuthenticated,
  updateRetailerProfile
);

retailerRouter.get("/retailer/products/:id", isAuthenticated, getRetailerProducts);
retailerRouter.post("/logout", isAuthenticated, logoutRetailer);

retailerRouter.post("/product/add", isAuthenticated, addProduct);
retailerRouter.put("/product/update/:id", isAuthenticated, updateProduct);
retailerRouter.get("/my/product", isAuthenticated, getProduct);
retailerRouter.delete("/product/delete", isAuthenticated, removeProduct);
