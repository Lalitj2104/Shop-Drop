import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};


const addReviewRequest =createAction("ADD_REVIEW_REQUEST")
const addReviewSuccess =createAction("ADD_REVIEW_SUCCESS")
const addReviewFailure =createAction("ADD_REVIEW_FAILURE")


const getReviewRequest =createAction("GET_REVIEW_REQUEST")
const getReviewSuccess =createAction("GET_REVIEW_SUCCESS")
const getReviewFailure =createAction("GET_REVIEW_FAILURE")



const updateReviewRequest =createAction("UPDATE_REVIEW_REQUEST")
const updateReviewSuccess =createAction("UPDATE_REVIEW_SUCCESS")
const updateReviewFailure =createAction("UPDATE_REVIEW_FAILURE")


const deleteReviewRequest =createAction("DELETE_REVIEW_REQUEST")
const deleteReviewSuccess =createAction("DELETE_REVIEW_SUCCESS")
const deleteReviewFailure =createAction("DELETE_REVIEW_FAILURE")



const getAllReviewForProductRequest =createAction("GET_ALL_REVIEW_FOR_PRODUCT_REQUEST")
const getAllReviewForProductSuccess =createAction("GET_ALL_REVIEW_FOR_PRODUCT_SUCCESS")
const getAllReviewForProductFailure =createAction("GET_ALL_REVIEW_FOR_PRODUCT_FAILURE")


const getAllReviewsByUserRequest =createAction("GET_ALL_REVIEWS_BY_USER_REQUEST")
const getAllReviewsByUserSuccess =createAction("GET_ALL_REVIEWS_BY_USER_SUCCESS")
const getAllReviewsByUserFailure =createAction("GET_ALL_REVIEWS_BY_USER_FAILURE")

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");


export const reviewReducer=createReducer(initialState,(builder)=>{
    builder
        .addCase(addReviewRequest,(state)=>{
            state.loading=true;
        })
        .addCase(addReviewSuccess,(state,action)=>{
            state.loading=false;
            state.review=action.payload.review;
            state.message=action.payload.message
        })
        .addCase(addReviewFailure,(action,state)=>{
            state.loading=false;
            state.error=action.payload
        })


        .addCase(getReviewRequest,(state)=>{
            state.loading=true;
        })
        .addCase(getReviewSuccess,(state,action)=>{
            state.loading=false;
            state.review=action.payload.review;
            state.message=action.payload.message
        })
        .addCase(getReviewFailure,(action,state)=>{
            state.loading=false;
            state.error=action.payload
        })


        .addCase(updateReviewRequest,(state)=>{
            state.loading=true;
        })
        .addCase(updateReviewSuccess,(state,action)=>{
            state.loading=false;
            state.review=action.payload.review;
            state.message=action.payload.message
        })
        .addCase(updateReviewFailure,(action,state)=>{
            state.loading=false;
            state.error=action.payload
        })



        .addCase(deleteReviewRequest,(state)=>{
            state.loading=true;
        })
        .addCase(deleteReviewSuccess,(state,action)=>{
            state.loading=false;
            state.review=null;
            state.message=action.payload.message
        })
        .addCase(deleteReviewFailure,(action,state)=>{
            state.loading=false;
            state.error=action.payload
        })


        .addCase(getAllReviewForProductRequest,(state)=>{
            state.loading=true;
        })
        .addCase(getAllReviewForProductSuccess,(state,action)=>{
            state.loading=false;
            state.review=action.payload.reviews;
            state.message=action.payload.message
        })
        .addCase(getAllReviewForProductFailure,(action,state)=>{
            state.loading=false;
            state.error=action.payload
        })



        
        .addCase(getAllReviewsByUserRequest,(state)=>{
            state.loading=true;
        })
        .addCase(getAllReviewsByUserSuccess,(state,action)=>{
            state.loading=false;
            state.review=action.payload.review;
            state.message=action.payload.message
        })
        .addCase(getAllReviewsByUserFailure,(action,state)=>{
            state.loading=false;
            state.error=action.payload
        })

        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })
})