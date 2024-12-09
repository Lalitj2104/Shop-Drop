import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials=true;

const URL=BACKEND_URL+"api/v1/order";

export const addOrder=(paymentStatus,paymentMethod,shippingAddress)=>async(dispatch)=>{
    try {
        dispatch({
            type:"ADD_ORDER_REQUEST"
        })
        const {data} =await axios.post(`${URL}/add`,{paymentStatus,paymentMethod,shippingAddress},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"ADD_ORDER_SUCCESS",
            payload:{
                message:data.message,
                order:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"ADD_ORDER_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}

export const cancelOrder=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"CANCEL_ORDER_REQUEST"
        })
        const {data} =await axios.put(`${URL}/cancel/${id}`)
        dispatch({
            type:"CANCEL_ORDER_SUCCESS",
            payload:{
                message:data.message,
                order:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"CANCEL_ORDER_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}



export const getOrderByUser=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GET_ORDER_BY_USER_REQUEST"
        })
        const {data} =await axios.get(`${URL}/userOrder`)
        console.log(data.data);
        dispatch({
            type:"GET_ORDER_BY_USER_SUCCESS",
            payload:{
                message:data.message,
                order:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"GET_ORDER_BY_USER_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}




export const getOrderByStatus=(status)=>async(dispatch)=>{
    try {
        dispatch({
            type:"GET_ORDER_BY_STATUS_REQUEST"
        })
        const {data} =await axios.get(`{URL}/status/${status}`)
        dispatch({
            type:"GET_ORDER_BY_STATUS_SUCCESS",
            payload:{
                message:data.message,
                order:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"GET_ORDER_BY_STATUS_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}



export const getOrderById=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GET_ORDER_BY_ID_REQUEST"
        })
        const {data} =await axios.get(`${URL}/order/${id}`)
        dispatch({
            type:"GET_ORDER_BY_ID_SUCCESS",
            payload:{
                message:data.message,
                order:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"GET_ORDER_BY_ID_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}



export const getOrderByRetailer=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GET_ORDER_BY_RETAILER_REQUEST"
        })
        const {data} =await axios.get(`${URL}/retailerOrder`)
        dispatch({
            type:"GET_ORDER_BY_RETAILER_SUCCESS",
            payload:{
                message:data.message,
                order:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"GET_ORDER_BY_RETAILER_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}

export const updateOrderStatus=(id,status)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UPDATE_ORDER_STATUS_REQUEST"
        })
        const {data} =await axios.put(`${URL}/update/${id}`,{status},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"UPDATE_ORDER_STATUS_SUCCESS",
            payload:{
                message:data.message,
                order:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"UPDATE_ORDER_STATUS_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}