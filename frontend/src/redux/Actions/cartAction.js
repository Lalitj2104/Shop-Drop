import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials=true;

const URL=BACKEND_URL+"/api/v1/cart";


export const addToCart=(id,quantity)=>async(dispatch)=>{
    try {
        dispatch({
            type:"ADD_TO_CART_REQUEST"
        })
        const {data}=await  axios.post(`${URL}/add/${id}`,{quantity},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"ADD_TO_CART_SUCCESS",
            payload:{
                message:data.message,
                cart:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"ADD_TO_CART_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}


export const updateCart=(details)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UPDATE_CART_REQUEST"
        })
        const {data}=await  axios.put(`{URL}/update`,{details},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"UPDATE_CART_SUCCESS",
            payload:{
                message:data.message,
                cart:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"UPDATE_CART_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}

export const getCart=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GET_CART_REQUEST"
        })
        const {data}=await  axios.get(`{URL}/myCart`)
        dispatch({
            type:"GET_CART_SUCCESS",
            payload:{
                message:data.message,
                cart:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"GET_CART_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}

export const clearCart=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"CLEAR_CART_REQUEST"
        })
        const {data}=await  axios.delete(`${URL}/delete`)
        dispatch({
            type:"CLEAR_CART_SUCCESS",
            payload:{
                message:data.message
            }
        })
    } catch (error) {
        dispatch({
            type:"CLEAR_CART_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}

