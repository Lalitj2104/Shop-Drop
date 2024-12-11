import axios from "axios";
import { BACKEND_URL } from "../../constants/url.js";

axios.defaults.withCredentials=true;

const URL=BACKEND_URL+"api/v1/admin";


export const LoginAdmin=(password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"CREATE_LOGIN_REQUEST"
        })
        console.log(password)
        const {data}=await axios.post(`${URL}/login`,{password},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials: true,

        })
        console.log(data)
        dispatch({
            type:"CREATE_LOGIN_SUCCESS",
            payload:data.message
        })
        
    } catch (error) {
        dispatch({
            type:"CREATE_LOGIN_FAILURE",
            payload:error.response?.data?.message,
        })
    }
}
export const logout=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LOGOUT_REQUEST"
        })
        const {data}=await axios.get(`${URL}/logout`);
        dispatch({
            type:"LOGOUT_SUCCESS",
            payload:data.message
        })
        
    } catch (error) {
        dispatch({
            type:"LOGOUT_FAILURE",
            payload:error.response?.data?.message,
        })
    }
}