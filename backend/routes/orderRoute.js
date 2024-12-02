import express from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
import { addOrder, cancelOrder, getOrderById, getOrderByRetailer, getOrderByUser, getOrdersByStatus, updateOrderStatus } from "../controllers/orderController.js";
import { isAuthenticate } from "../middleware/retailAuth.js";


const orderRouter=express.Router();

orderRouter.post("/add",isAuthenticated,addOrder);
orderRouter.delete("/cancel",isAuthenticated,cancelOrder);
orderRouter.get("/userOrder",isAuthenticated,getOrderByUser);
orderRouter.get("/status",isAuthenticated,getOrdersByStatus);
orderRouter.get("/order/:id",isAuthenticated,getOrderById);

orderRouter.get("/retailerOrder",isAuthenticate,getOrderByRetailer);
orderRouter.put("/update",isAuthenticate,updateOrderStatus);

export default orderRouter;