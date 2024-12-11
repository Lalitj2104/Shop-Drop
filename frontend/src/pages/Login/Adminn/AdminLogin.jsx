import React, { useEffect, useState } from "react";
import "../../../styles/AdminLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginAdmin } from "../../../redux/Actions/adminAction";
import { toast } from "react-toastify";
import toastOptions from "../../../constants/toast";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
    const [passkey, setPasskey] = useState(""); // Initialize state for input
    const{message,isAuthenticated,error}=useSelector((state)=>state.adminAuth)
    const navigate=useNavigate();
    const handleInputChange = (e) => {
        setPasskey(e.target.value); // Update the passkey on input
    };

    const dispatch=useDispatch();
    useEffect(()=>{
        if(message){
            toast.success(message,toastOptions);
            navigate("/admin");
            dispatch({type:"CLEAR_MESSAGE"})

        }
        if(error){
            toast.error(error,toastOptions);
            dispatch({type:"CLEAR_ERROR"})
        }
    },[message,dispatch,error]);
    const handler=()=>{
        // console.log(passkey);
        dispatch(LoginAdmin(passkey));
        
    }
    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <h2 className="admin-login-title">Admin Log In</h2>
                <p className="admin-login-subtitle">Please enter your details</p>
                <input
                    type="password"
                    className="admin-login-input"
                    placeholder="passkey"
                    value={passkey}
                    onChange={handleInputChange}
                />
                <button className="admin-login-button" onClick ={handler}>Log In</button>
            </div>
        </div>
    );
};

export default AdminLoginPage;

