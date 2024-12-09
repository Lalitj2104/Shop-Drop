import express from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
import { addToCart, clearCart, getCart,removeProductFromCart, updateCart } from "../controllers/cartController.js";
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: "./config/config.env" });


const cartRouter=express.Router();

cartRouter.post("/add/:productId",isAuthenticated,addToCart);
cartRouter.put("/update",isAuthenticated,updateCart);
cartRouter.get("/myCart",isAuthenticated,getCart);
cartRouter.delete("/deleteProduct/:id",isAuthenticated,removeProductFromCart)
cartRouter.delete("/delete",isAuthenticated,clearCart);

const stripe = new Stripe(process.env.STRIPE_SECRET);


cartRouter.post("/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    try {
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default cartRouter;