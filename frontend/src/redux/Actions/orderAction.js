import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials = true;

const URL = BACKEND_URL + "api/v1/order";

export const addOrder =
	(paymentStatus, paymentMethod, shippingAddress) => async (dispatch) => {
		try {
			dispatch({
				type: "ADD_ORDER_REQUEST",
			});
			const { data } = await axios.post(
				`${URL}/add`,
				{ paymentStatus, paymentMethod, shippingAddress },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			dispatch({
				type: "ADD_ORDER_SUCCESS",
				payload: {
					message: data.message,
					// order:data.data
				},
			});
		} catch (error) {
			dispatch({
				type: "ADD_ORDER_FAILURE",
				payload: error.response?.data?.message,
			});
		}
	};

export const cancelOrder = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "CANCEL_ORDER_REQUEST",
		});
		console.log(id);
		const { data } = await axios.put(`${URL}/cancel/${id}`);
		console.log(data);
		dispatch({
			type: "CANCEL_ORDER_SUCCESS",
			payload: {
				message: data.message,
				order: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "CANCEL_ORDER_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const getOrderByUser = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ORDER_BY_USER_REQUEST",
		});
		const { data } = await axios.get(`${URL}/userOrder`);
		dispatch({
			type: "GET_ORDER_BY_USER_SUCCESS",
			payload: {
				message: data.message,
				order: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_ORDER_BY_USER_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const getOrderByStatus = (status) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ORDER_BY_STATUS_REQUEST",
		});
		const { data } = await axios.get(`${URL}/status/${status}`);
		dispatch({
			type: "GET_ORDER_BY_STATUS_SUCCESS",
			payload: {
				message: data.message,
				orders: data.data,
			},
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_ORDER_BY_STATUS_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const getOrderById = (orderId) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ORDER_BY_ID_REQUEST",
		});
		const { data } = await axios.get(`${URL}/my/${orderId}`);
		dispatch({
			type: "GET_ORDER_BY_ID_SUCCESS",
			payload: {
				message: data.message,
				order: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_ORDER_BY_ID_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};


export const getOrderByUId = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ORDER_BY_ID_REQUEST",
		});
		const { data } = await axios.get(`${URL}/user/${id}`);
		dispatch({
			type: "GET_ORDER_BY_ID_SUCCESS",
			payload: {
				message: data.message,
				order: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_ORDER_BY_ID_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const getOrderByRetailer = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ORDER_BY_RETAILER_REQUEST",
		});
		const { data } = await axios.get(`${URL}/retailerOrder`);
		// console.log(data.data);
		dispatch({
			type: "GET_ORDER_BY_RETAILER_SUCCESS",
			payload: {
				message: data.message,
				rorder: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_ORDER_BY_RETAILER_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const updateOrderStatus = (id, status) => async (dispatch) => {
	try {
		dispatch({
			type: "UPDATE_ORDER_STATUS_REQUEST",
		});
		const { data } = await axios.put(
			`${URL}/update/${id}`,
			{ status },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		dispatch({
			type: "UPDATE_ORDER_STATUS_SUCCESS",
			payload: {
				message: data.message,
				order: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "UPDATE_ORDER_STATUS_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const getAllOrders = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ALL_ORDERS_REQUEST",
		});

		const { data } = await axios.get(`${URL}/all`);

		dispatch({
			type: "GET_ALL_ORDERS_SUCCESS",
			payload:{
				message:data.message,
				orders:data.data,
			} 
		});

	} catch (error) {
		dispatch({
			type: "GET_ALL_ORDERS_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};
