import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const addOrderRequest=createAction("ADD_ORDER_REQUEST");
const addOrderSuccess=createAction("ADD_ORDER_SUCCESS");
const addOrderFailure=createAction("ADD_ORDER_FAILURE");


const cancelOrderRequest=createAction("CANCEL_ORDER_REQUEST");
const cancelOrderSuccess=createAction("CANCEL_ORDER_SUCCESS");
const cancelOrderFailure=createAction("CANCEL_ORDER_FAILURE");


const getOrderByUserRequest=createAction("GET_ORDER_BY_USER_REQUEST");
const getOrderByUserSuccess=createAction("GET_ORDER_BY_USER_SUCCESS");
const getOrderByUserFailure=createAction("GET_ORDER_BY_USER_FAILURE");



const getOrderByStatusRequest=createAction("GET_ORDER_BY_STATUS_REQUEST");
const getOrderByStatusSuccess=createAction("GET_ORDER_BY_STATUS_SUCCESS");
const getOrderByStatusFailure=createAction("GET_ORDER_BY_STATUS_FAILURE");

const getOrderByIdRequest=createAction("GET_ORDER_BY_ID_REQUEST");
const getOrderByIdSuccess=createAction("GET_ORDER_BY_ID_SUCCESS");
const getOrderByIdFailure=createAction("GET_ORDER_BY_ID_FAILURE");

const getOrderByRetailerRequest=createAction("GET_ORDER_BY_RETAILER_REQUEST");
const getOrderByRetailerSuccess=createAction("GET_ORDER_BY_RETAILER_SUCCESS");
const getOrderByRetailerFailure=createAction("GET_ORDER_BY_RETAILER_FAILURE");


const updateOrderStatusRequest=createAction("UPDATE_ORDER_STATUS_REQUEST");
const updateOrderStatusSuccess=createAction("UPDATE_ORDER_STATUS_SUCCESS");
const updateOrderStatusFailure=createAction("UPDATE_ORDER_STATUS_FAILURE");


const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");


export const orderReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase(addOrderRequest,(state)=>{
        state.loading=true;
    })
    .addCase(addOrderSuccess,(state,action)=>{
        state.loading=false;
        // state.order=action.payload.order,
        state.message=action.payload.message
    })
    .addCase(addOrderFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })



    .addCase(cancelOrderRequest,(state)=>{
        state.loading=true;
    })
    .addCase(cancelOrderSuccess,(state,action)=>{
        state.loading=false;
        state.order=null,
        state.message=action.payload.message
    })
    .addCase(cancelOrderFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })



    .addCase(getOrderByUserRequest,(state)=>{
        state.loading=true;
    })
    .addCase(getOrderByUserSuccess,(state,action)=>{
        state.loading=false;
        state.order=action.payload.order,
        state.message=action.payload.message
    })
    .addCase(getOrderByUserFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })


    .addCase(getOrderByIdRequest,(state)=>{
        state.loading=true;
    })
    .addCase(getOrderByIdSuccess,(state,action)=>{
        state.loading=false;
        state.order=action.payload.order,
        state.message=action.payload.message
    })
    .addCase(getOrderByIdFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })


    .addCase(getOrderByStatusRequest,(state)=>{
        state.loading=true;
    })
    .addCase(getOrderByStatusSuccess,(state,action)=>{
        state.loading=false;
        state.orders=action.payload.orders,
        state.message=action.payload.message
    })
    .addCase(getOrderByStatusFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })



    .addCase(getOrderByRetailerRequest,(state)=>{
        state.loading=true;
    })
    .addCase(getOrderByRetailerSuccess,(state,action)=>{
        state.loading=false;
        state.rorder=action.payload.rorder,
        state.message=action.payload.message
    })
    .addCase(getOrderByRetailerFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })


    .addCase(updateOrderStatusRequest,(state)=>{
        state.loading=true;
    })
    .addCase(updateOrderStatusSuccess,(state,action)=>{
        state.loading=false;
        state.order=action.payload.order,
        state.message=action.payload.message
    })
    .addCase(updateOrderStatusFailure,(state,action)=>{
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