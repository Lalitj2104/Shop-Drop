import { message } from "../utils/message"
import { Response } from "../utils/response";

export const addProduct=async(req,res)=>{
    //checking user
    if(!req.user){
        return Response(res,400,false,message.retailerNotFoundMessage);
    }

    //getting the data from body
    const {  }=req.body;

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