import Product from "../models/product.js";
import Review from "../models/review.js";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";

export const addReview=async(req,res)=>{
    try {
        //parsing the params
    const{productId}=req.params;

    //checking product
    const product=await Product.findById(productId);
    if(!product){
        return Response(res,400,false,message.noProductMessage)
    }
    //checking body
    const {rating,title,description }=req.body;
    if(!rating||!title||!description){
        return Response(res,400,false,message.missingFieldMessage);
    }
    const newReview= await Review.create({
        userId:req.user._id,
        productId:product._id,
        title:title,
        description:description,
        rating:rating,

    })

    Response(res,200,true,message.reviewCreatedMessage)
    } catch (error) {
        console.log(error.message);
        Response(res,500,false,error.message);
    }

}

export const getReview=async(req,res)=>{
    try {
        //parsing the params
    const{reviewId}=req.params;
    const review=await Review.findById(reviewId).populate("userId", "name").populate("productId", "name");

    if(!review){
        return Response(res,400,false,message.reviewNotFoundMessage);
    }
    Response(res,200,true,message.reviewFoundMessage,review);

    } catch (error) {
        Response(res,500,false,error.message);
    }
}

export const deleteReview=async(req,res)=>{
    try {
        
        const {reviewId}=req.params;
        const review=await Review.findById(reviewId);
        if(!review){
            return Response(res,400,false,message.reviewNotFoundMessage);
        }
        if(review.userId.toString!==req.user._id.toString){
            return Response(res,400,false,message.accessInvalidMessage)
        }

        await Review.findByIdAndDelete(reviewId);
        Response(res,201,true,message.reviewDeletedMessage);

    } catch (error) {
        Response(res,500,false,error.message);
    }

}
export const updateReview=async(req,res)=>{
    try {
        const{reviewId}=req.params;
        const reviews=await Review.findById(reviewId);
        if(!reviews){
            return Response(res,400,false,message.reviewNotFoundMessage);
        }
        if(review.userId.toString!==req.user._id.toString){
            return Response(res,400,false,message.accessInvalidMessage);
        }
        const {review, rating,title,description }=req.body;

        reviews.review=review ||reviews.review;
        reviews.rating=rating ||reviews.rating;
        reviews.title=title||reviews.title;
        reviews.description=description ||reviews.description;
        
        await review.save();

        Response(res,200,true,message.reviewUpdatedMessage,review);


        
    } catch (error) {
        Response(res,500,false,error.message);
    }
}
export const getAllReviewsByUser=async(req,res)=>{
    try {
        const reviews=await Review.find({userId:req.user._id}).populate("productId", "name");

        Response(res,201,true,message.reviewsFoundMessage,reviews);
    } catch (error) {
        Response(res,500,false,error.message);
    }
}

export const getAllReviewsForProduct = async(req,res)=>{
    try {
        const {productId}=req.params;
        const product=await Product.findById(productId);
        if(!product){
            return Response(res,400,false,message.noProductMessage);
        }
        const reviews=await Review.find({productId:product._id}).populate("userId", "firstName lastName");

        Response(res,201,true,message.reviewsFoundMessage,reviews);
        
    } catch (error) {
        Response(res,500,false,error.message);
    }
}