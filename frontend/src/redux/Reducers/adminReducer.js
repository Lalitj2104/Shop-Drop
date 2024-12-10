import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const adminLoginRequest=createAction("CREATE_LOGIN_REQUEST");
const adminLoginSuccess=createAction("CREATE_LOGIN_SUCCESS");
const adminLoginFailure=createAction("CREATE_LOGIN_FAILURE");


const clearAuthError = createAction("CLEAR_AUTH_ERROR");

const clearError=createAction("CLEAR_ERROR")
const clearMessage=createAction("CLEAR_MESSAGE")

export const adminReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase(adminLoginRequest,state=>{
        state.loading=true;
    })
    .addCase(adminLoginSuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload,
        state.isAuthenticated=true;
    })
    .addCase(adminLoginFailure,(state,action)=>{
        state.loading=false;
       state.error=action.payload, 
        state.isAuthenticated=false;
    })
    .addCase(clearError, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
    .addCase(clearAuthError, (state) => {
        state.authError = null;
    });
})