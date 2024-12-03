import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const addProductRequest=createAction("ADD_PRODUCT_REQUEST");
const addProductSuccess=createAction("ADD_PRODUCT_SUCCESS");
const addProductFailure=createAction("ADD_PRODUCT_FAILURE");

const updateProductRequest=createAction("UPDATE_PRODUCT_REQUEST");
const updateProductSuccess=createAction("UPDATE_PRODUCT_SUCCESS");
const updateProductFailure=createAction("UPDATE_PRODUCT_FAILURE");

const getAllRetailerProductsRequest=createAction("GET_ALL_RETAILER_PRODUCTS_REQUEST");
const getAllRetailerProductsSuccess=createAction("GET_ALL_RETAILER_PRODUCTS_SUCCESS");
const getAllRetailerProductsFailure=createAction("GET_ALL_RETAILER_PRODUCTS_FAILURE");

const getProductRequest=createAction("GET_PRODUCT_REQUEST");
const getProductSuccess=createAction("GET_PRODUCT_SUCCESS");
const getProductFailure=createAction("GET_PRODUCT_FAILURE");


const deleteProductRequest=createAction("DELETE_PRODUCT_REQUEST");
const deleteProductSuccess=createAction("DELETE_PRODUCT_SUCCESS");
const deleteProductFailure=createAction("DELETE_PRODUCT_FAILURE");

const getAllProductsRequest=createAction("GET_ALL_PRODUCTS_REQUEST");
const getAllProductsSuccess=createAction("GET_ALL_PRODUCTS_SUCCESS");
const getAllProductsFailure=createAction("GET_ALL_PRODUCTS_FAILURE");


export const productReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase(addProductRequest,(state)=>{
        state.loading=true;
    })
    .addCase(addProductSuccess,(state,action)=>{
        state.loading=false;
        state.product=action.payload.product;
        state.message=action.payload.message;
    })
    .addCase(addProductFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })


    .addCase(updateProductRequest,(state)=>{
        state.loading=true;
    })
    .addCase(updateProductSuccess,(state,action)=>{
        state.loading=false;
        state.product=action.payload.product;
        state.message=action.payload.message;
    })
    .addCase(updateProductFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })




    .addCase(getAllRetailerProductsRequest,(state)=>{
        state.loading=true;
    })
    .addCase(getAllRetailerProductsSuccess,(state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
        state.message=action.payload.message;
    })
    .addCase(getAllRetailerProductsFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })


    .addCase(getProductRequest,(state)=>{
        state.loading=true;
    })
    .addCase(getProductSuccess,(state,action)=>{
        state.loading=false;
        state.product=action.payload.product;
        state.message=action.payload.message;
    })
    .addCase(getProductFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })



    .addCase(deleteProductRequest,(state)=>{
        state.loading=true;
    })
    .addCase(deleteProductSuccess,(state,action)=>{
        state.loading=false;
        state.product=null;
    })
    .addCase(deleteProductFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })





    .addCase(getAllProductsRequest,(state)=>{
        state.loading=true;

    })
    .addCase(getAllProductsSuccess,(state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
        state.message=action.payload.message;
    })
    .addCase(getAllProductsFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })

})