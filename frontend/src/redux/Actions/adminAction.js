import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

axios.defaults.withCredentials=true;

const URL=BACKEND_URL+"api/v1/admin";


export const LoginAdmin=(password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"ADMIN_LOGIN_REQUEST"
        })
        const {data}=await axios.post(`${URL}/login`,{password},{
            headers:{
                "Content-Type":"application/json"
            }

        })
        console.log(data)
        dispatch({
            type:"ADMIN_LOGIN_SUCCESS",
            payload:data.message
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type:"ADMIN_LOGIN_FAILURE",
            payload:error.response?.data?.message,
        })
    }
}