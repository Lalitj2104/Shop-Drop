import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials=true;

const URL=BACKEND_URL+"api/v1/user"

const URL1=BACKEND_URL+"api/v1/wishList"

export const loginUser=(email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"USER_LOGIN_REQUEST"
        })
        const {data}=await axios.post(`${URL}/login`,{email,password},{
            headers:{
                "content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch({
            type:"USER_LOGIN_SUCCESS",
            payload:{
                message:data.message,
                id:data.data
            }
        })
    } catch (error) {
        dispatch({
            type:"USER_LOGIN_FAILURE",
            payload:error.response?.data?.message
        })
    }
}

export const registerUser=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const verifyRegisterOtp=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const resendRegisterOtp=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const forgotUserpassword=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const resetUserPassword=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const changeUserPassword=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const getUserProfile=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const logoutUser=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const deleteUser=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}




export const addUserAddress=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const getUserAddress=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}


export const setUserDefaultAddress=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}


export const removeUserAddress=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}


export const addUserReview=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const getUserReview=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const updateUserReview=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const deleteUserReview=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const getAllUserReviews=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const getAllProductReviews=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}


export const addProductWishList=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const updateProductWishList=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const getAllProductWishList=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

export const deleteProductWishList=()=>async(dispatch)=>{
    try {
        
    } catch (error) {
        
    }
}

