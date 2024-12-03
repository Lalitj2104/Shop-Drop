import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials=true;

const URL=BACKEND_URL+"/api/v1/product";

export const  addProduct=(details)=>async(dispatch)=>{
        try {
            dispatch({
                type:"ADD_PRODUCT_REQUEST"
            });

            const {data}=await axios.post(`${URL}/add`, details, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            dispatch({
                type:"ADD_PRODUCT_SUCCESS",
                payload:{
                    message:data.message,
                    product:data.data,
                },
            })
            
        } catch (error) {
            dispatch({
                type:"ADD_PRODUCT_FAILURE",
                payload:error.response?.data?.message
            })
        }
}


export const updateProduct=(id,details)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UPDATE_PRODUCT_REQUEST"
        })

        const {data}= await axios.put(`${URL}/update/${id}`,details, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        dispatch({
            type:"UPDATE_PRODUCT_SUCCESS",
            payload:{
                message:data.message,
                product:data.data,
            },
        })
        
    } catch (error) {
        dispatch({
            type:"UPDATE_PRODUCT_FAILURE",
            payload: error.response?.data?.message,
        })
    }
}

export const getAllProducts=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GET_ALL_RETAILER_PRODUCTS_REQUEST"
        })
        const {data}=await axios.get(`${URL}/my/products`)

        dispatch({
            type:"GET_ALL_RETAILER_PRODUCTS_SUCCESS",
            payload:{
                message:data.message,
                products:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"GET_ALL_RETAILER_PRODUCTS_FAILURE",
            payload:error.response?.data?.message
        })
    }
}


export const getProduct=(id)=async(dispatch)=>{
    try {
        dispatch({
            type:"GET_PRODUCT_REQUEST"
        })

        const {data}= await axios.get(`${URL}/my/product/${id}`);
        dispatch({
            type:"GET_PRODUCT_SUCCESS",
            payload:{
                message:data.message,
                product:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"GET_PRODUCT_FAILURE",
            payload:error.response?.data?.message,
        })
    }
}

export const removeProduct=(id)=async(dispatch)=>{
    try {
        dispatch({
            type:"DELETE_PRODUCT_REQUEST"
        });
        const {data}=await axios.delete(`${URL}/delete/${id}`);
        dispatch({
            type:"DELETE_PRODUCT_SUCCESS",
            payload:{
                message:data.message,
                product:null
            }
        })

        
    } catch (error) {
        dispatch({
            type:"DELETE_PRODUCT_FAILURE",
            payload:error.response?.data?.message,
        })
    }
}


export const getProducts=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GET_ALL_PRODUCTS_REQUEST"
        })
        const {data} = await axios.get(`${URL}/all`);

        dispatch({
            type:"GET_ALL_PRODUCTS_SUCCESS",
            payload:{
                message:data.message,
                products:data.data
            }
        })
        
    } catch (error) {
        dispatch({
            type:"GET_ALL_PRODUCTS_FAILURE",
            payload:error.response?.data?.message,
        })
    }
}