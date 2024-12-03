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
        return Response(res,400,message.noProductMessage)
    }
    //checking body
    const {review, rating,title,description }=req.body;
    if(!review||!rating||!title||!description){
        return Response(res,400,message.missingFieldMessage);
    }
    const newReview= await Review.create({
        review:review,
        userId:req.user._id,
        productId:product._id,
        title:title,
        description:description,
        rating:rating,

    })

    Response(res,200,message.reviewCreatedMessage)
    } catch (error) {
        Response(res,500,error.message);
    }

}

export const getReview=async(req,res)=>{
    try {
        //parsing the params
    const{reviewId}=req.params;
    const review=await Review.findById(reviewId).populate("userId", "name").populate("productId", "name");

    if(!review){
        return Response(res,400,message.reviewNotFoundMessage);
    }
    Response(res,200,message.reviewFoundMessage);

    } catch (error) {
        Response(res,500,error.message);
    }
}

export const deleteReview=async(req,res)=>{
    try {
        
        const {reviewId}=req.params;
        const review=await Review.findById(reviewId);
        if(!review){
            return Response(res,400,message.reviewNotFoundMessage);
        }
        if(review.userId.toString!==req.user._id.toString){
            return Response(res,400,message.accessInvalidMessage)
        }

        await Review.findByIdAndDelete(reviewId);
        Response(res,201,message.reviewDeletedMessage);

    } catch (error) {
        Response(res,500,error.message);
    }

}
export const updateReview=async(req,res)=>{
    try {
        const{reviewId}=req.params;
        const reviews=await Review.findById(reviewId);
        if(!reviews){
            return Response(res,400,message.reviewNotFoundMessage);
        }
        if(review.userId.toString!==req.user._id.toString){
            return Response(res,400,message.accessInvalidMessage);
        }
        const {review, rating,title,description }=req.body;

        reviews.review=review ||reviews.review;
        reviews.rating=rating ||reviews.rating;
        reviews.title=title||reviews.title;
        reviews.description=description ||reviews.description;
        
        await review.save();

        Response(res,200,message.reviewUpdatedMessage);


        
    } catch (error) {
        Response(res,500,error.message);
    }
}
export const getAllReviewsByUser=async(req,res)=>{
    try {
        const reviews=await Review.find({userId:req.user._id}).populate("productId", "name");

        Response(res,201,message.reviewsFoundMessage,reviews);
    } catch (error) {
        Response(res,500,error.message);
    }
}

export const getAllReviewsForProduct = async(req,res)=>{
    try {
        const {productId}=req.params;
        const product=await Product.findById(productId);
        if(!product){
            return Response(res,400,message.noProductMessage);
        }
        const reviews=await Review.find({productId:product._id}).populate("userId", "name");

        Response(res,201,message.reviewsFoundMessage,reviews);
        
    } catch (error) {
        Response(res,500,error.message);
    }
}