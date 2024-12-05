import { useEffect, useState } from "react";
import "../../../styles/ChangePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../../../constants/toast";
import { retailerChangePassword } from "../../../redux/Actions/retailerActions";

const ChangeRetailerPassword = () => {
	const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    
    const { loading, message, error } = useSelector((state) => state.retailerAuth);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password && password === confirmPassword) {
			// setMessage("Password reset successfully!");
            // Redirect to login or homepage
            dispatch(retailerChangePassword(id, password));
		}else{
			toast.error("Password does not match",toastOptions)
			dispatch({ type: "CLEAR_MESSAGE" });
		}
    };
    
    useEffect(() => {
        if (message) {
            toast.success(message, toastOptions);
            dispatch({ type: "CLEAR_MESSAGE" });
            navigate("/retailerLogin");
        }
    
        if (error) {
            toast.error(error, toastOptions);
            dispatch({ type: "CLEAR_ERROR" });
        }
    }, [dispatch, message, error, navigate]);

	return (
		<div className="change-password-container">
			<div className="form-box">
				<h2>Reset Password</h2>
				<form onSubmit={handleSubmit}>
					<div className="input-field">
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label>New Password</label>
					</div>
					<div className="input-field">
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<label>Confirm Password</label>
					</div>
					<button type="submit" className="btn" disabled={loading}>
						{loading === true ? <span className="spinner"></span> : "Submit"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChangeRetailerPassword;