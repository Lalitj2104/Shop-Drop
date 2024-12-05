import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};


const addWishListRequest =createAction("ADD_WISHLIST_REQUEST")
const addWishListSuccess =createAction("ADD_WISHLIST_SUCCESS")
const addWishListFailure =createAction("ADD_WISHLIST_FAILURE")


const updateWishListRequest =createAction("UPDATE_WISHLIST_REQUEST")
const updateWishListSuccess =createAction("UPDATE_WISHLIST_SUCCESS")
const updateWishListFailure =createAction("UPDATE_WISHLIST_FAILURE")


const getWishListRequest =createAction("GET_WISHLIST_REQUEST")
const getWishListSuccess =createAction("GET_WISHLIST_SUCCESS")
const getWishListFailure =createAction("GET_WISHLIST_FAILURE")

const deleteWishListRequest =createAction("DELETE_WISHLIST_REQUEST")
const deleteWishListSuccess =createAction("DELETE_WISHLIST_SUCCESS")
const deleteWishListFailure =createAction("DELETE_WISHLIST_FAILURE")

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");


export const wishListReducer=(initialState,(builder)=>{
    builder
        .addCase(addWishListRequest,(state)=>{
            state.loading=true;
        })
        .addCase(addWishListSuccess,(state,action)=>{
            state.loading=false,
            state.wishList=action.payload.wishList
            state.message=action.payload.message
        })
        .addCase(addWishListFailure,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })



        .addCase(updateWishListRequest,(state)=>{
            state.loading=true;
        })
        .addCase(updateWishListSuccess,(state,action)=>{
            state.loading=false,
            state.wishList=action.payload.wishList
            state.message=action.payload.message
        })
        .addCase(updateWishListFailure,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })



        .addCase(getWishListRequest,(state)=>{
            state.loading=true;
        })
        .addCase(getWishListSuccess,(state,action)=>{
            state.loading=false,
            state.wishList=action.payload.wishList
            state.message=action.payload.message
        })
        .addCase(getWishListFailure,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })



        .addCase(deleteWishListRequest,(state)=>{
            state.loading=true;
        })
        .addCase(deleteWishListSuccess,(state,action)=>{
            state.loading=false,
            state.wishList=null
            state.message=action.payload.message
        })
        .addCase(deleteWishListFailure,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })



        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })

})