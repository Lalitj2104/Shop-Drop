import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials = true;

const URL = BACKEND_URL + "api/v1/user";

// const URL1 = BACKEND_URL + "api/v1/wishList";

export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: "USER_LOGIN_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/login`,
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
			type: "USER_LOGIN_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "USER_LOGIN_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const registerUser = (details) => async (dispatch) => {
	try {
		dispatch({
			type: "USER_REGISTER_REQUEST",
		});
		const { data } = await axios.post(`${URL}/register`, details, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		// console.log(data);
		dispatch({
			type: "USER_REGISTER_SUCCESS",
			payload: {
				message: data.message,
				id:data.data

			},
		});
	} catch (error) {
		dispatch({
			type: "USER_REGISTER_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const verifyRegisterOtp = (id, otp) => async (dispatch) => {
	try {
		dispatch({
			type: "REGISTER_OTP_REQUEST",
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
			type: "REGISTER_OTP_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "REGISTER_OTP_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const resendRegisterOtp = (id) => async (dispatch) => {
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
};

export const forgotUserpassword = (email) => async (dispatch) => {
	try {
		dispatch({
			type: "FORGOT_USER_PASSWORD_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/forgot-Password`,
			{ email },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "FORGOT_USER_PASSWORD_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "FORGOT_USER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const resetUserPassword = (id, otp) => async (dispatch) => {
	try {
		dispatch({
			type: "RESET_USER_PASSWORD_REQUEST",
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
			type: "RESET_USER_PASSWORD_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RESET_USER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const changeUserPassword = (id, password) => async (dispatch) => {
	try {
		dispatch({
			type: "CHANGE_USER_PASSWORD_REQUEST",
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
			type: "CHANGE_USER_PASSWORD_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "CHANGE_USER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LOAD_USER_REQUEST"
        })

        const { data } = await axios.get(`${URL}/me`)

        dispatch({
            type: "LOAD_USER_SUCCESS",
            payload: data.data
        })
        
    } catch (error) {
        dispatch({
            type: "LOAD_USER_FAILURE",
            payload: error.response?.data?.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
  try {
	dispatch({
		type: "LOGOUT_USER_REQUEST",
	});
	
	const { data } = await axios.post(`${URL}/logout`,{}, {
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
	dispatch({
		type: "LOGOUT_USER_SUCCESS",
		payload: data.message,
	});
  } catch (error) {
	dispatch({
		type:"LOGOUT_USER_FAILURE",
		payload:error.response?.data?.message
	})
  }
};


export const addUserAddress = (details) => async (dispatch) => {
	  try {
		dispatch({
			type:"ADD_USER_ADDRESS_REQUEST"
		})
		const{data}=await axios.post(`${URL}/add/address`,{details},{
			headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		});
		dispatch({
			type:"ADD_USER_ADDRESS_SUCCESS"
		})
	  } catch (error) {
		dispatch({
			type:"ADD_USER_ADDRESS_FAILURE",
			payload:error?.response?.data?.message
		})
	  }
	};
// export const getUserProfile = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };



// export const deleteUser = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };



// export const getUserAddress = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const setUserDefaultAddress = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const removeUserAddress = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const addUserReview = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const getUserReview = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const updateUserReview = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const deleteUserReview = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const getAllUserReviews = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const getAllProductReviews = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const addProductWishList = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const updateProductWishList = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const getAllProductWishList = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };

// export const deleteProductWishList = () => async (dispatch) => {
//   try {
//   } catch (error) {}
// };
