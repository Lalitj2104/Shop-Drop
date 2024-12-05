import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials=true;

const URL=BACKEND_URL+"api/v1/retailer"

export const loadRetailer = () => async (dispatch) => {
	try {
		dispatch({
			type: "LOAD_RETAILER_REQUEST",
		});

		const { data } = await axios.get(`${URL}/me`);

		dispatch({
			type: "LOAD_RETAILER_SUCCESS",
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: "LOAD_RETAILER_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const registerRetailer=(details)=>async(dispatch)=>{
    try {
		dispatch({
			type: "RETAILER_REGISTER_REQUEST",
		});
		const { data } = await axios.post(`${URL}/retailerRegister`, details, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		// console.log(data);
		dispatch({
			type: "RETAILER_REGISTER_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "RETAILER_REGISTER_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
}

export const verifyRetailerRegister=(id,otp)=>async(dispatch)=>{
    try {
		dispatch({
			type: "RETAILER_REGISTER_OTP_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/verify/${id}`,
			{ otp },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "RETAILER_REGISTER_OTP_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RETAILER_REGISTER_OTP_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
}


export const resendVerifyRetailerRegister=(id)=>async(dispatch)=>{
    try {
		dispatch({
			type: "RESEND_REGISTER_OTP_REQUEST",
		});
		const { data } = await axios.get(`${URL}/resend/${id}`);
		dispatch({
			type: "RESEND_REGISTER_OTP_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RESEND_REGISTER_OTP_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
}

export const retailerLogin=(email,password)=>async(dispatch)=>{
    try {
		dispatch({
			type: "RETAILER_LOGIN_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/retailerLogin`,
			{ email, password },
			{
				headers: {
					"content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		console.log(data);
		dispatch({
			type: "RETAILER_LOGIN_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "RETAILER_LOGIN_FAILURE",
			payload: error.response?.data?.message,
		});
	}
}


export const retailerLoginVerify=(id,otp)=>async(dispatch)=>{
    try {
		dispatch({
			type: "RETAILER_LOGIN_OTP_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/login/verify/${id}`,
			{ otp },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "RETAILER_LOGIN_OTP_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RETAILER_LOGIN_OTP_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
}

export const retailerLoginVerifyResend=(id)=>async(dispatch)=>{
    try {
		dispatch({
			type: "RESEND_LOGIN_OTP_REQUEST",
		});
		const { data } = await axios.get(`${URL}/login/resend/${id}`);
		dispatch({
			type: "RESEND_LOGIN_OTP_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RESEND_LOGIN_OTP_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
}

export const retailerForgotPassword=(email)=>async(dispatch)=>{
    try {
		dispatch({
			type: "FORGOT_RETAILER_PASSWORD_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/forgot`,
			{ email },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "FORGOT_RETAILER_PASSWORD_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "FORGOT_RETAILER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
}

export const retailerResetPassword=(id,otp)=>async(dispatch)=>{
    try {
		dispatch({
			type: "RESET_RETAILER_PASSWORD_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/reset/${id}`,
			{ otp },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "RESET_RETAILER_PASSWORD_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RESET_RETAILER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
}


export const retailerChangePassword=(id,password)=>async(dispatch)=>{
    try {
		dispatch({
			type: "CHANGE_RETAILER_PASSWORD_REQUEST",
		});
		const { data } = await axios.put(
			`${URL}/change-Password/${id}`,
			{ password },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "CHANGE_RETAILER_PASSWORD_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "CHANGE_RETAILER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
}

export const logoutRetailer=()=>async(dispatch)=>{
    try {
		dispatch({
			type: "LOGOUT_RETAILER_REQUEST",
		});

		const { data } = await axios.post(
			`${URL}/logout`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "LOGOUT_RETAILER_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "LOGOUT_RETAILER_FAILURE",
			payload: error.response?.data?.message,
		});
	}
}

// export const deleteRetailer=()=>async(dispatch)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }

// export const getRetailerProfiles=()=>async(dispatch)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }
// export const updateRetailerProfiles=()=>async(dispatch)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }

// export const getRetailerProductsById=()=>async(dispatch)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }





