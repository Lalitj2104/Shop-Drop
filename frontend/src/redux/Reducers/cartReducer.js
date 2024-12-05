import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};


const addToCartRequest =createAction("ADD_TO_CART_REQUEST")
const addToCartSuccess =createAction("ADD_TO_CART_SUCCESS")
const addToCartFailure =createAction("ADD_TO_CART_FAILURE")



const updateCartRequest =createAction("UPDATE_CART_REQUEST")
const updateCartSuccess =createAction("UPDATE_CART_SUCCESS")
const updateCartFailure =createAction("UPDATE_CART_FAILURE")


const getCartRequest =createAction("GET_CART_REQUEST")
const getCartSuccess =createAction("GET_CART_SUCCESS")
const getCartFailure =createAction("GET_CART_FAILURE")



const clearCartRequest =createAction("CLEAR_CART_REQUEST")
const clearCartSuccess =createAction("CLEAR_CART_SUCCESS")
const clearCartFailure =createAction("CLEAR_CART_FAILURE")

export const cartReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase(addToCartRequest,(state)=>{
        state.loading=true
    })
    .addCase(addToCartSuccess,(state,action)=>{
        state.loading=false
        state.cart=action.payload.cart
        state.message=action.payload.message
    })
    .addCase(addToCartFailure,(state,action)=>{
        state.loading=false,
        state.error=action.payload
    })



    .addCase(updateCartRequest,(state)=>{
        state.loading=true
    })
    .addCase(updateCartSuccess,(state,action)=>{
        state.loading=false
        state.cart=action.payload.cart
        state.message=action.payload.message
    })
    .addCase(updateCartFailure,(state,action)=>{
        state.loading=false,
        state.error=action.payload
    })


    .addCase(getCartRequest,(state)=>{
        state.loading=true
    })
    .addCase(getCartSuccess,(state,action)=>{
        state.loading=false
        state.cart=action.payload.cart
        state.message=action.payload.message
    })
    .addCase(getCartFailure,(state,action)=>{
        state.loading=false,
        state.error=action.payload
    })


    .addCase(clearCartRequest,(state)=>{
        state.loading=true
    })
    .addCase(clearCartSuccess,(state,action)=>{
        state.loading=false
        state.cart=null
        state.message=action.payload.message
    })
    .addCase(clearCartFailure,(state,action)=>{
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