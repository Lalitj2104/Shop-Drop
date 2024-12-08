import Cart from "../models/cart.js";
import Product from "../models/product.js";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";

export const addToCart =async(req,res)=>{
    try {
        // console.log("working")
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
        let cart =await Cart.findOne({userId:req.user._id});
        console.log(cart);
        if(!cart){
            cart=await Cart.create({
                userId:req.user._id,
                products:[{
                   productId: product._id,
                    quantity,
                    price:product.price,
                    retailerId:product.retailerId
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
                    retailerId:product.retailerId
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
        // console.log("working")
        const cart=await Cart.findOne({userId:req.user._id})
        .populate({
            path: 'products.productId',
            select: 'name description image price', 
        });
            // console.log(cart);
        Response(res,200,true,message.cartFetchedMessage,cart);
    } catch (error) {
        Response(res,500,false,error.message);
    }
}


export const removeProductFromCart=async(req,res)=>{
    try {
        
        const {id} =req.params;
        const product=await Product.findById(id);
        if(!product){
            return Response(res,400,false,message.noProductMessage);

        }
        
        const cart=await Cart.findOne({userId:req.user._id})
        .populate({
            path: 'products.productId',
            select: 'name description image price', 
        });
        console.log(cart);
        if(cart){
            cart.products=cart.products.filter((item)=>!(item?.productId?._id.toString()===id.toString()))
        }
        await cart.save();
        console.log(cart);
        Response(res,200,true,message.productRemovedMessage,cart)
    } catch (error) {
        Response(res,500,false,error.message);
    }
}


export const clearCart=async(req,res)=>{
    try {

        const cart=await Cart.findOne({userId: req.user._id});

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


export const updateCart=async(req,res)=>{
    try {
        const {id,quantity}=req.body;
        if(!id ||!quantity){
            return Response(res,400,false,message.idNotFoundMessage);
        }

        let cart=await Cart.findOne({userId:req.user._id})
        
        
        if (!cart) {
            return Response(res, 404, false, "Cart not found.");
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (item) => item.productId.toString() === id.toString()
        );

        if (productIndex === -1) {
            return Response(res, 404, false, "Product not found in the cart.");
        }
        if (quantity < 1) {
            return Response(res,400,false,"Min quantity")
        } else {
            
            cart.products[productIndex].quantity = quantity;
        }

        // Save the updated cart
        await cart.save();
        cart=await Cart.findOne({userId:req.user._id})
        .populate({
            path: 'products.productId',
            select: 'name description image price', 
        });

        Response(res, 200, true, "Cart updated successfully.", cart);

        
    } catch (error) {
        Response(res,500,false,error.message);
    }
}

