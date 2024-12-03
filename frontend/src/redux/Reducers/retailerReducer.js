import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const RetailerLoginRequest = createAction("RETAILER_LOGIN_REQUEST");
const RetailerLoginSuccess = createAction("RETAILER_LOGIN_SUCCESS");
const RetailerLoginFailure = createAction("RETAILER_LOGIN_FAILURE");

const RetailerRegisterRequest = createAction("RETAILER_REGISTER_REQUEST");
const RetailerRegisterSuccess = createAction("RETAILER_REGISTER_SUCCESS");
const RetailerRegisterFailure = createAction("RETAILER_REGISTER_FAILURE");

const RetailerRegisterOtpRequest = createAction("RETAILER_REGISTER_OTP_REQUEST");
const RetailerRegisterOtpSuccess = createAction("RETAILER_REGISTER_OTP_SUCCESS");
const RetailerRegisterOtpFailure = createAction("RETAILER_REGISTER_OTP_FAILURE");

const ResendRegisterOtpRequest = createAction("RESEND_REGISTER_OTP_REQUEST");
const ResendRegisterOtpSuccess = createAction("RESEND_REGISTER_OTP_SUCCESS");
const ResendRegisterOtpFailure = createAction("RESEND_REGISTER_OTP_FAILURE");

const loadRetailerRequest = createAction("LOAD_RETAILER_REQUEST");
const loadRetailerSuccess = createAction("LOAD_RETAILER_SUCCESS");
const loadRetailerFailure = createAction("LOAD_RETAILER_FAILURE");

const RetailerLoginOtpRequest = createAction("RETAILER_LOGIN_OTP_REQUEST");
const RetailerLoginOtpSuccess = createAction("RETAILER_LOGIN_OTP_SUCCESS");
const RetailerLoginOtpFailure = createAction("RETAILER_LOGIN_OTP_FAILURE");


const ResendLoginOtpRequest = createAction("RESEND_LOGIN_OTP_REQUEST");
const ResendLoginOtpSuccess = createAction("RESEND_LOGIN_OTP_SUCCESS");
const ResendLoginOtpFailure = createAction("RESEND_LOGIN_OTP_FAILURE");


const forgotRetailerPasswordRequest = createAction("FORGOT_RETAILER_PASSWORD_REQUEST");
const forgotRetailerPasswordSuccess = createAction("FORGOT_RETAILER_PASSWORD_SUCCESS");
const forgotRetailerPasswordFailure = createAction("FORGOT_RETAILER_PASSWORD_FAILURE");


const resetRetailerPasswordRequest = createAction("RESET_RETAILER_PASSWORD_REQUEST");
const resetRetailerPasswordSuccess = createAction("RESET_RETAILER_PASSWORD_SUCCESS");
const resetRetailerPasswordFailure = createAction("RESET_RETAILER_PASSWORD_FAILURE");


const changeRetailerPasswordRequest = createAction("CHANGE_RETAILER_PASSWORD_REQUEST");
const changeRetailerPasswordSuccess = createAction("CHANGE_RETAILER_PASSWORD_SUCCESS");
const changeRetailerPasswordFailure = createAction("CHANGE_RETAILER_PASSWORD_FAILURE");


const logoutRetailerRequest=createAction("LOGOUT_RETAILER_REQUEST");
const logoutRetailerSuccess = createAction("LOGOUT_RETAILER_SUCCESS");
const logoutRetailerFailure = createAction("LOGOUT_RETAILER_FAILURE");

const clearError = createAction("CLEAR_ERROR");
const clearAuthError = createAction("CLEAR_AUTH_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const retailerReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(RetailerLoginRequest, (state) => {
			state.rloading = true;
		})
		.addCase(RetailerLoginSuccess, (state) => {
			state.rloading = false;
			state.message = action.payload.message;
			state.id = action.payload.id;
		})
		.addCase(RetailerLoginFailure, (state) => {
			state.rloading = false;
			state.error = action.payload;
		})



		.addCase(RetailerRegisterRequest, (state) => {
			state.rloading = true;
		})
		.addCase(RetailerRegisterSuccess, (state) => {
			state.rloading = false;
			state.message = action.payload.message;
			state.id = action.payload.id;
		})
		.addCase(RetailerRegisterFailure, (state) => {
			state.rloading = false;
			state.error = action.payload;
		})





		.addCase(RetailerRegisterOtpRequest, (state) => {
			state.rloading = true;
		})
		.addCase(RetailerRegisterOtpSuccess, (state) => {
			state.rloading = false;
			state.message = action.payload;
			state.isRetailerAuthenticated = true;
		})
		.addCase(RetailerRegisterOtpFailure, (state) => {
			state.rloading = false;
			state.error = action.payload;
			state.isRetailerAuthenticated = false;
		})




		.addCase(ResendRegisterOtpRequest, (state) => {
			state.rloading = true;
		})
		.addCase(ResendRegisterOtpSuccess, (state) => {
			state.rloading = false;
			state.message = action.payload;
		})
		.addCase(ResendRegisterOtpFailure, (state) => {
			state.rloading = false;
			state.error = action.payload;
		})





		.addCase(RetailerLoginOtpRequest, (state) => {
			state.rloading = true;
		})
		.addCase(RetailerLoginOtpSuccess, (state) => {
			state.rloading = false;
			state.message = action.payload;
			state.isRetailerAuthenticated = true;
		})
		.addCase(RetailerLoginOtpFailure, (state) => {
			state.rloading = false;
			state.error = action.payload;
			state.isRetailerAuthenticated = false;
		})




		.addCase(ResendLoginOtpRequest, (state) => {
			state.rloading = true;
		})
		.addCase(ResendLoginOtpSuccess, (state) => {
			state.rloading = false;
			state.message = action.payload;
		})
		.addCase(ResendLoginOtpFailure, (state) => {
			state.rloading = false;
			state.error = action.payload;
		})


		.addCase(forgotRetailerPasswordRequest, (state) => {
			state.rloading = true;
		})
		.addCase(forgotRetailerPasswordSuccess, (state, action) => {
			state.rloading = false;
			state.message = action.payload;
			state.id = action.payload.id;
		})
		.addCase(forgotRetailerPasswordFailure, (state, action) => {
			state.rloading = false;
			state.error = action.payload;
		})



		.addCase(resetRetailerPasswordRequest, (state) => {
			state.rloading = true;
		})
		.addCase(resetRetailerPasswordSuccess, (state, action) => {
			state.rloading = false;
			state.message = action.payload;
		})
		.addCase(resetRetailerPasswordFailure, (state, action) => {
			state.rloading = false;
			state.error = action.payload;
		})


		.addCase(changeRetailerPasswordRequest, (state) => {
			state.rloading = true;
		})
		.addCase(changeRetailerPasswordSuccess, (state, action) => {
			state.rloading = false;
			state.message = action.payload;
		})
		.addCase(changeRetailerPasswordFailure, (state, action) => {
			state.rloading = false;
			state.error = action.payload;
		})


		.addCase(loadRetailerRequest, (state) => {
			state.rloading = true;
		})
		.addCase(loadRetailerSuccess, (state, action) => {
			state.rloading = false;
			state.Retailer = action.payload;
			state.isRetailerAuthenticated = true;
		})
		.addCase(loadRetailerFailure, (state, action) => {
			state.rloading = false;
			state.authError = action.payload;
			state.isRetailerAuthenticated = false;
		})



		.addCase(logoutRetailerRequest,(state)=>{
			state.rloading=true;
		})
		.addCase(logoutRetailerSuccess,(state,action)=>{
			state.rloading=false;
			state.message=action.payload
		})
		.addCase(logoutRetailerFailure,(state,action)=>{
			state.rloading=false;
			state.error=action.payload
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


});
