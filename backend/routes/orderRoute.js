import express from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
import { addOrder, cancelOrder, getOrderById, getOrderByRetailer, getOrderByUser, getOrdersByStatus, updateOrderStatus } from "../controllers/orderController.js";
import { isAuthenticate } from "../middleware/retailAuth.js";


const orderRouter=express.Router();

orderRouter.post("/add",isAuthenticated,addOrder);
orderRouter.put("/cancel/:id",isAuthenticated,cancelOrder);
orderRouter.get("/userOrder",isAuthenticated,getOrderByUser);
orderRouter.get("/status/:status",isAuthenticated,getOrdersByStatus);
orderRouter.get("/order/:id",isAuthenticated,getOrderById);

orderRouter.get("/retailerOrder",isAuthenticate,getOrderByRetailer);
orderRouter.put("/update/:id",isAuthenticate,updateOrderStatus);

export default orderRouter;