import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {};

const userLoginRequest = createAction("USER_LOGIN_REQUEST");
const userLoginSuccess = createAction("USER_LOGIN_SUCCESS");
const userLoginFailure = createAction("USER_LOGIN_FAILURE");

const userRegisterRequest = createAction("USER_REGISTER_REQUEST");
const userRegisterSuccess = createAction("USER_REGISTER_SUCCESS");
const userRegisterFailure = createAction("USER_REGISTER_FAILURE");

const RegisterOtpRequest = createAction("REGISTER_OTP_REQUEST");
const RegisterOtpSuccess = createAction("REGISTER_OTP_SUCCESS");
const RegisterOtpFailure = createAction("REGISTER_OTP_FAILURE");

const ResendRegisterOtpRequest = createAction("RESEND_REGISTER_OTP_REQUEST");
const ResendRegisterOtpSuccess = createAction("RESEND_REGISTER_OTP_SUCCESS");
const ResendRegisterOtpFailure = createAction("RESEND_REGISTER_OTP_FAILURE");

const forgotUserPasswordRequest = createAction("FORGOT_USER_PASSWORD_REQUEST");
const forgotUserPasswordSuccess = createAction("FORGOT_USER_PASSWORD_SUCCESS");
const forgotUserPasswordFailure = createAction("FORGOT_USER_PASSWORD_FAILURE");

const resetUserPasswordRequest = createAction("RESET_USER_PASSWORD_REQUEST");
const resetUserPasswordSuccess = createAction("RESET_USER_PASSWORD_SUCCESS");
const resetUserPasswordFailure = createAction("RESET_USER_PASSWORD_FAILURE");

const changeUserPasswordRequest = createAction("CHANGE_USER_PASSWORD_REQUEST");
const changeUserPasswordSuccess = createAction("CHANGE_USER_PASSWORD_SUCCESS");
const changeUserPasswordFailure = createAction("CHANGE_USER_PASSWORD_FAILURE");

const addUserAddressRequest = createAction("ADD_USER_ADDRESS_REQUEST");
const addUserAddressSuccess = createAction("ADD_USER_ADDRESS_SUCCESS");
const addUserAddressFailure = createAction("ADD_USER_ADDRESS_FAILURE");

const getAllAddressRequest = createAction("GET_ALL_ADDRESS_REQUEST");
const getAllAddressSuccess = createAction("GET_ALL_ADDRESS_SUCCESS");
const getAllAddressFailure = createAction("GET_ALL_ADDRESS_FAILURE");


const getAllusersRequest = createAction("GET_ALL_USERS_REQUEST");
const getAllusersSuccess = createAction("GET_ALL_USERS_SUCCESS");
const getAllusersFailure = createAction("GET_ALL_USERS_FAILURE");


const removeAddressRequest = createAction("REMOVE_ADDRESS_REQUEST");
const removeAddressSuccess = createAction("REMOVE_ADDRESS_SUCCESS");
const removeAddressFailure = createAction("REMOVE_ADDRESS_FAILURE");


const setDefaultAddressRequest = createAction("SET_DEFAULT_ADDRESS_REQUEST");
const setDefaultAddressSuccess = createAction("SET_DEFAULT_ADDRESS_SUCCESS");
const setDefaultAddressFailure = createAction("SET_DEFAULT_ADDRESS_FAILURE");


const logoutUserRequest=createAction("LOGOUT_USER_REQUEST");
const logoutUserSuccess = createAction("LOGOUT_USER_SUCCESS");
const logoutUserFailure = createAction("LOGOUT_USER_FAILURE");

const loadUserRequest = createAction('LOAD_USER_REQUEST');
const loadUserSuccess = createAction('LOAD_USER_SUCCESS');
const loadUserFailure = createAction('LOAD_USER_FAILURE');

const clearError = createAction("CLEAR_ERROR");
const clearAuthError = createAction("CLEAR_AUTH_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(userLoginRequest, (state) => {
			state.loading = true;
		})
		.addCase(userLoginSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.id = action.payload.id;
			state.isAuthenticated = true;
		})
		.addCase(userLoginFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.isAuthenticated = false;
		})

		.addCase(userRegisterRequest, (state) => {
			state.loading = true;
		})
		.addCase(userRegisterSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.id = action.payload.id;
		})
		.addCase(userRegisterFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(RegisterOtpRequest, (state) => {
			state.loading = true;
		})
		.addCase(RegisterOtpSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
			state.isAuthenticated = true;
		})
		.addCase(RegisterOtpFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.isAuthenticated = false;
		})

		.addCase(ResendRegisterOtpRequest, (state) => {
			state.loading = true;
		})
		.addCase(ResendRegisterOtpSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(ResendRegisterOtpFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		

		.addCase(addUserAddressRequest,(state)=>{
			state.loading=true;
		})
		.addCase(addUserAddressSuccess,(state,action)=>{
			state.loading=false;
			state.address=action.payload.address
			state.message=action.payload.message
		})
		.addCase(addUserAddressFailure,(state,action)=>{
			state.loading=false;
			state.error=action.payload
		})


		.addCase(getAllusersRequest,(state)=>{
			state.loading=true;
		})
		.addCase(getAllusersSuccess,(state,action)=>{
			state.loading=false;
			state.users=action.payload.users
			state.message=action.payload.message
		})
		.addCase(getAllusersFailure,(state,action)=>{
			state.loading=false;
			state.error=action.payload
		})


		.addCase(getAllAddressRequest,(state)=>{
			state.loading=true;
		})
		.addCase(getAllAddressSuccess,(state,action)=>{
			state.loading=false;
			state.address=action.payload.data
			state.message=action.payload.message
		})
		.addCase(getAllAddressFailure,(state,action)=>{
			state.loading=false;
			state.error=action.payload
		})


		.addCase(removeAddressRequest,(state)=>{
			state.loading=true;
		})
		.addCase(removeAddressSuccess,(state,action)=>{
			state.loading=false;
			state.address=null
			state.message=action.payload.message
		})
		.addCase(removeAddressFailure,(state,action)=>{
			state.loading=false;
			state.error=action.payload
		})



		.addCase(setDefaultAddressRequest,(state)=>{
			state.loading=true;
		})
		.addCase(setDefaultAddressSuccess,(state,action)=>{
			state.loading=false;
			state.message=action.payload
		})
		.addCase(setDefaultAddressFailure,(state,action)=>{
			state.loading=false;
			state.error=action.payload
		})
		


		.addCase(logoutUserRequest,(state)=>{
			state.loading=true;
		})
		.addCase(logoutUserSuccess,(state,action)=>{
			state.loading=false;
			state.message=action.payload
		})
		.addCase(logoutUserFailure,(state,action)=>{
			state.loading=false;
			state.error=action.payload
		})



		.addCase(loadUserRequest, (state) => {
			state.userLoading = true;
		})
		.addCase(loadUserSuccess, (state, action) => {
			state.userLoading = false;
			state.user = action.payload;
			state.isAuthenticated = true;
		})
		.addCase(loadUserFailure, (state, action) => {
			state.userLoading = false;
			state.authError = action.payload;
			state.isAuthenticated = false;
		})



		.addCase(forgotUserPasswordRequest, (state) => {
			state.loading = true;
		})
		.addCase(forgotUserPasswordSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
			state.id = action.payload.id;
		})
		.addCase(forgotUserPasswordFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})



		.addCase(resetUserPasswordRequest, (state) => {
			state.loading = true;
		})
		.addCase(resetUserPasswordSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(resetUserPasswordFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})




		.addCase(changeUserPasswordRequest, (state) => {
			state.loading = true;
		})
		.addCase(changeUserPasswordSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(changeUserPasswordFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
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
