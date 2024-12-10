import express from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
import { addOrder, cancelOrder, getAllOrders, getOrderById, getOrderByRetailer, getOrderByUser, getOrdersByStatus, updateOrderStatus } from "../controllers/orderController.js";
import { isAuthenticate } from "../middleware/retailAuth.js";


const orderRouter=express.Router();

orderRouter.post("/add",isAuthenticated,addOrder);
orderRouter.put("/cancel/:orderId", isAuthenticated, cancelOrder);
orderRouter.get("/userOrder",isAuthenticated,getOrderByUser);
orderRouter.get("/status/:status",isAuthenticate,getOrdersByStatus);
orderRouter.get("/my/:orderId", isAuthenticate, getOrderById);
orderRouter.get("/user/:orderId", isAuthenticated, getOrderById);
orderRouter.get("/all", getAllOrders);

orderRouter.get("/retailerOrder",isAuthenticate,getOrderByRetailer);
orderRouter.put("/update/:orderId", isAuthenticate, updateOrderStatus);

export default orderRouter;