import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials = true;

const URL = BACKEND_URL + "api/v1/wishList";

export const addWishList = (productId) => async (dispatch) => {
	try {
		dispatch({
			type: "ADD_WISHLIST_REQUEST",
		});

		const { data } = await axios.post(`${URL}/add/${productId}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		dispatch({
			type: "ADD_WISHLIST_SUCCESS",
			payload: {
				message: data.message,
				wishList: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "ADD_WISHLIST_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const updateWishList = (productId) => async (dispatch) => {
	try {
		dispatch({
			type: "UPDATE_WISHLIST_REQUEST",
		});

		const { data } = await axios.put(`${URL}/update/${productId}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		dispatch({
			type: "UPDATE_WISHLIST_SUCCESS",
			payload: {
				message: data.message,
				wishList: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "UPDATE_WISHLIST_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const getWishList = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_WISHLIST_REQUEST",
		});

		const { data } = await axios.get(`${URL}/my/wishlist`);

		console.log("Data: ", data);
		dispatch({
			type: "GET_WISHLIST_SUCCESS",
			payload: {
				message: data.message,
				wishList: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_WISHLIST_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const deleteWishList = () => async (dispatch) => {
	try {
		dispatch({
			type: "DELETE_WISHLIST_REQUEST",
		});

		const { data } = await axios.delete(`${URL}/delete`);
		dispatch({
			type: "DELETE_WISHLIST_SUCCESS",
			payload: {
				message: data.message,
			},
		});
	} catch (error) {
		dispatch({
			type: "DELETE_WISHLIST_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const removeWishList = (productId) => async (dispatch) => {
	try {
		dispatch({
			type: "REMOVE_WISHLIST_REQUEST",
		});

        const { data } = await axios.delete(`${URL}/remove/${productId}`);
        
		dispatch({
			type: "REMOVE_WISHLIST_SUCCESS",
			payload: {
				message: data.message,
				wishList: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "REMOVE_WISHLIST_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};
