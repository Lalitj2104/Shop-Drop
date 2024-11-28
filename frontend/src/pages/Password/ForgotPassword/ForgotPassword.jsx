import { useEffect, useState } from "react";
import "../../../styles/ForgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotUserpassword } from "../../../redux/Actions/userActions";
import { toast } from "react-toastify";
import toastOptions from "../../../constants/toast";

const ForgotPassword = () => {
	const spans = Array.from({ length: 128 });
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, message, error, id } = useSelector(
		(state) => state.userAuth
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(forgotUserpassword(email));
	};

	useEffect(() => {
		if (message) {
			toast.success(message.message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			navigate(`/reset/${id}`);
		}

		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, message, error, navigate, id]);

	return (
		<div className="forget-password-container">
			{spans.map((_, index) => (
				<span key={index} className="span"></span>
			))}
			<div className="form-box">
				<div className="content">
					<h2>Forgot Password</h2>
					<p>
						Enter your email address below and we&apos;ll send you a link to
						reset your password.
					</p>
					<form onSubmit={handleSubmit} className="form">
						{/* Input with Floating Label */}
						<div className="floating-label">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder=" "
								required
							/>
							<label>Enter your email</label>
						</div>
						<button type="submit" className="btn" disabled={loading}>
							{loading === true ? <span className="spinner"></span> : "Submit"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
