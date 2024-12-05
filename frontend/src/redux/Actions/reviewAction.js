import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials=true;

const URL=BACKEND_URL+"/api/v1/review";

export const addUserReview = (id,review, rating,title,description) => async (dispatch) => {
  try {
    dispatch({
        type:"ADD_REVIEW_REQUEST"
    })
    const {data}=await axios.post(`${URL}/add/${id}`,{review, rating,title,description},{
        headers:{
            "Content-Type":"application/json"
        }
    })
    dispatch({
        type:"ADD_REVIEW_SUCCESS",
        payload:{
            message:data.message
        }
    })
  } catch (error) {
    dispatch({
        type:"ADD_REVIEW_FAILURE",
        payload: error?.response?.data?.message,
    })
  }
};

export const getUserReview = (id) => async (dispatch) => {
    try {
      dispatch({
          type:"GET_REVIEW_REQUEST"
      })
      const {data}=await axios.get(`${URL}/get/${id}`)
      dispatch({
          type:"GET_REVIEW_SUCCESS",
          payload:{
            message:data.message,
            review:data.data
          }
      })
    } catch (error) {
      dispatch({
          type:"GET_REVIEW_FAILURE",
          payload: error?.response?.data?.message,
      })
    }
  };

export const updateUserReview = (id,review, rating,title,description) => async (dispatch) => {
    try {
      dispatch({
          type:"UPDATE_REVIEW_REQUEST"
      })
      const {data}=await axios.put(`{$URL}/update/${id}`,{review, rating,title,description},{
            headers:{
            "Content-Type":"application/json"
        }
      })
      dispatch({
          type:"UPDATE_REVIEW_SUCCESS",
          payload:{
            message:data.message,
            review:data.data
          }
      })
    } catch (error) {
      dispatch({
          type:"UPDATE_REVIEW_FAILURE",
          payload: error?.response?.data?.message,
      })
    }
  };

export const deleteUserReview = () => async (dispatch) => {
    try {
      dispatch({
          type:"DELETE_REVIEW_REQUEST"
      })
      const {data}=await axios.delete(`${URL}/${id}`)
      dispatch({
          type:"DELETE_REVIEW_SUCCESS",
          payload:{
            message:data.message,
            // review:data.data
          }
      })
    } catch (error) {
      dispatch({
          type:"DELETE_REVIEW_FAILURE",
          payload: error?.response?.data?.message,
      })
    }
  };
export const getAllUserReviews = (id) => async (dispatch) => {
    try {
      dispatch({
          type:"GET_ALL_REVIEW_FOR_PRODUCT_REQUEST"
      })
      const {data}=await axios.get(`${URL}/all/userReview/${id}`)
      dispatch({
          type:"GET_ALL_REVIEW_FOR_PRODUCT_SUCCESS",
          payload:{
            message:data.message,
            review:data.data
          }
      })
    } catch (error) {
      dispatch({
          type:"GET_ALL_REVIEW_FOR_PRODUCT_FAILURE",
          payload: error?.response?.data?.message,
      })
    }
  };

export const getAllProductReviews = (id) => async (dispatch) => {
    try {
      dispatch({
          type:"GET_ALL_REVIEWS_BY_USER_REQUEST"
      })
      const {data}=await axios.get(`{URL}/all/${id}`)
      dispatch({
          type:"GET_ALL_REVIEWS_BY_USER_SUCCESS",
          payload:{
            message:data.message,
            review:data.data
          }
      })
    } catch (error) {
      dispatch({
          type:"GET_ALL_REVIEWS_BY_USER_FAILURE",
          payload: error?.response?.data?.message,
      })
    }
  };