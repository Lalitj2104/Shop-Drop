import React, { useState } from "react";
import "../../../styles/AdminLogin.css";

const AdminLoginPage = () => {
    const [passkey, setPasskey] = useState(""); // Initialize state for input

    const handleInputChange = (e) => {
        setPasskey(e.target.value); // Update the passkey on input
    };

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
                <button className="admin-login-button">Log In</button>
            </div>
        </div>
    );
};

export default AdminLoginPage;

