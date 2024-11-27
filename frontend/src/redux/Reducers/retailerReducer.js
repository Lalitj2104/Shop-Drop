// import { createAction, createReducer } from "@reduxjs/toolkit";

// const initialState = {};

// const RetailerLoginRequest = createAction("RETAILER_LOGIN_REQUEST");
// const RetailerLoginSuccess = createAction("RETAILER_LOGIN_SUCCESS");
// const RetailerLoginFailure = createAction("RETAILER_LOGIN_FAILURE");

// const RetailerRegisterRequest = createAction("RETAILER_REGISTER_REQUEST");
// const RetailerRegisterSuccess = createAction("RETAILER_REGISTER_SUCCESS");
// const RetailerRegisterFailure = createAction("RETAILER_REGISTER_FAILURE");

// const RegisterOtpRequest = createAction("REGISTER_OTP_REQUEST");
// const RegisterOtpSuccess = createAction("REGISTER_OTP_SUCCESS");
// const RegisterOtpFailure = createAction("REGISTER_OTP_FAILURE");

// const ResendRegisterOtpRequest = createAction("RESEND_REGISTER_OTP_REQUEST");
// const ResendRegisterOtpSuccess = createAction("RESEND_REGISTER_OTP_SUCCESS");
// const ResendRegisterOtpFailure = createAction("RESEND_REGISTER_OTP_FAILURE");

// const loadRetailerRequest = createAction("LOAD_RETAILER_REQUEST");
// const loadRetailerSuccess = createAction("LOAD_RETAILER_SUCCESS");
// const loadRetailerFailure = createAction("LOAD_RETAILER_FAILURE");

// const clearError = createAction("CLEAR_ERROR");
// const clearAuthError = createAction("CLEAR_AUTH_ERROR");
// const clearMessage = createAction("CLEAR_MESSAGE");

// export const retailerReducer = createReducer(initialState, (builder) => {
// 	builder
// 		.addCase(RetailerLoginRequest, (state) => {
// 			state.loading = true;
// 		})
// 		.addCase(RetailerLoginSuccess, (state) => {
// 			state.loading = false;
// 			state.message = action.payload.message;
// 			state.id = action.payload.id;
// 		})
// 		.addCase(RetailerLoginFailure, (state) => {
// 			state.loading = false;
// 			state.error = action.payload;
// 		})

// 		.addCase(RetailerRegisterRequest, (state) => {
// 			state.loading = true;
// 		})
// 		.addCase(RetailerRegisterSuccess, (state) => {
// 			state.loading = false;
// 			state.message = action.payload.message;
// 			state.id = action.payload.id;
// 		})
// 		.addCase(RetailerRegisterFailure, (state) => {
// 			state.loading = false;
// 			state.error = action.payload;
// 		})

// 		.addCase(RegisterOtpRequest, (state) => {
// 			state.loading = true;
// 		})
// 		.addCase(RegisterOtpSuccess, (state) => {
// 			state.loading = false;
// 			state.message = action.payload;
// 			state.isAuthenticated = true;
// 		})
// 		.addCase(RegisterOtpFailure, (state) => {
// 			state.loading = false;
// 			state.errro = action.payload;
// 			state.isAuthenticated = false;
// 		})

// 		.addCase(ResendRegisterOtpRequest, (state) => {
// 			state.loading = true;
// 		})
// 		.addCase(ResendRegisterOtpSuccess, (state) => {
// 			state.loading = false;
// 			state.message = action.payload;
// 		})
// 		.addCase(ResendRegisterOtpFailure, (state) => {
// 			state.loading = false;
// 			state.error = action.payload;
// 		})

// 		.addCase(loadRetailerRequest, (state) => {
// 			state.RetailerLoading = true;
// 		})
// 		.addCase(loadRetailerSuccess, (state, action) => {
// 			state.RetailerLoading = false;
// 			state.Retailer = action.payload;
// 			state.isAuthenticated = true;
// 		})
// 		.addCase(loadRetailerFailure, (state, action) => {
// 			state.RetailerLoading = false;
// 			state.authError = action.payload;
// 			state.isAuthenticated = false;
// 		})

// 		.addCase(clearError, (state) => {
// 			state.error = null;
// 		})
// 		.addCase(clearMessage, (state) => {
// 			state.message = null;
// 		})
// 		.addCase(clearAuthError, (state) => {
// 			state.authError = null;
// 		});
// });
