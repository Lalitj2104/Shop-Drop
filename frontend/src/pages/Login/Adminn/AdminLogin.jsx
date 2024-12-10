import React, { useState } from "react";
import "../../../styles/AdminLogin.css";
import { useDispatch } from "react-redux";
import { LoginAdmin } from "../../../redux/Actions/adminAction";

const AdminLoginPage = () => {
    const [passkey, setPasskey] = useState(""); // Initialize state for input

    const handleInputChange = (e) => {
        setPasskey(e.target.value); // Update the passkey on input
    };
    const dispatch=useDispatch();
    
    const handler=()=>{
        console.log(passkey);
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

