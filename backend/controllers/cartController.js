import Cart from "../models/cart.js";
import Product from "../models/product.js";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";

export const addToCart =async(req,res)=>{
    try {
        const {productId}=req.params;
        const {quantity}=req.body;
        if(quantity<=0){
            return Response(res,400,false,message.invalidQuantityMessage);
        }
        

        const product=await Product.findById(productId);
        if(!product){
            return Response(res,400,false,message.noProductMessage);
        }
        //quantity available or not
        if(product.available_quantity_delivery<quantity){
            return Response(res, 400,false, message.insufficientQuantityMessage);
        }
        let cart =await Cart.findById(req.user._id);
        if(!cart){
            cart=await Cart.create({
                userId:req.user._id,
                products:[{
                   productId: product._id,
                    quantity,
                    price:product.price,
                    productId
            }]
            })
        }else{
            const productExist=cart.products.findIndex((item)=>(item.productId.toString()===productId.toString()));
            if(productExist>-1){
                cart.products[productExist].quantity +=quantity;
            }
            else{
                cart.products.push({
                    productId:product._id,
                    quantity,
                    price:product.price,
                    productId
                })
            }
        }
        await cart.save();
        Response(res,200,true,message.productAddedMessage,cart);

    } catch (error) {
        Response(res,500,false,error.message);
    }
}

export const getCart=async(req,res)=>{
    try {
        const cart=await Cart.findById(req.user._id).populate('products.productId');

        Response(res,200,true,message.cartFetchedMessage,cart);
    } catch (error) {
        Response(res,500,false,error.message);
    }
}


export const removeProductFromCart=async(req,res)=>{
    try {
        const {productId} =req.body
        const product=await Product.findById(productId);
        if(!product){
            return Response(res,400,false,message.noProductMessage);

        }

        const cart=await Cart.findById(req.user._id);

        if(cart){
            cart.products=cart.products.filter((item)=>!(item.productId.toString()===productId.toString()))
        }
        await cart.save();
        Response(res,200,true,message.productRemovedMessage,cart)
    } catch (error) {
        Response(res,500,false,error.message);
    }
}


export const clearCart=async(req,res)=>{
    try {

        const cart=await Cart.findById(req.user._id);

        if(!cart){
            return Response(res,400,false,message.cartEmptyMessage);
        }
        cart.products=[];
        await cart.save();
        Response(res,200,true,message.cartClearMessage,cart);
        
    } catch (error) {
        Response(res,500,false,error.message);
    }
}

//yet to complete
export const updateCart=async(req,res)=>{
    try {
        
    } catch (error) {
        Response(res,500,false,error.message);
    }
}
