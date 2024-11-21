import mongoose from "mongoose";
import Product from "../models/product";
import Retailer from "../models/retailer";
import { message } from "../utils/message"
import { Response } from "../utils/response";

export const addProduct=async(req,res)=>{
   try {
     //checking user
     if(!req.user){
        return Response(res,400,false,message.retailerNotFoundMessage);
    }
    let retailer=await Retailer.findById(req.user.id);
    if(!retailer){
        return Response(res,400,false,message.retailerNotFoundMessage);
    }
    //getting the data from body
    const { image,name,description,category,price,available_quantity_delivery, available_quantity_inStore,tags,brand}=req.body;
    //checking the fields
    if(!name ||!description||!category ||!price ||!tags ||!brand){
        return Response(res,400,false,message.missingFieldMessage);
    }
    if (image) {
        const result = await cloudinary.v2.uploader.upload(image, {
          folder: "posts",
          //width:150
          //crp:"scale",
          //height:150,
        });
        req.body.image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
    const newProduct=await Product.create({
        image:image,
        product_id:mongoose.Schema.ObjectId(),
        retailer_id:retailer._id,
        name:name,
        description:description,
        category:category,
        price:price,
        available_quantity_delivery:available_quantity_delivery,
        available_quantity_inStore:available_quantity_inStore,
        brand:brand,
        tags:tags,
    })
    await Product.Save();
    Response(res,200,true,message.productAddedMessage,product);
    
   } catch (error) {
    Response(res,500,false,error.message);
   }

}

export const removeProduct=async(req,res)=>{

}

export const updateProduct=async(req,res)=>{

}

export const getAllProducts=async(req,res)=>{
    if(!req.user){
        return Response(res.messa)
    }


}

export const getProduct=async(req,res)=>{
    
}