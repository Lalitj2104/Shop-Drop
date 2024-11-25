// src/components/ForgetPassword.jsx
import { useState } from "react";
import "../../../styles/ForgotPassword.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email) {
			alert(
				"If this email is associated with an account, a password reset link will be sent."
			);
			setEmail("");
		} else {
			alert("Please enter a valid email address.");
		}
	};

	return (
		<div className="forget-password-container">
			<div className="form-box">
				<h2>Forgot Password?</h2>
				<p>
					Enter your email address below and we&apos;ll send you a link to reset
					your password.
				</p>
				<form onSubmit={handleSubmit}>
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
					<button type="submit" className="btn">
						Send Reset Link
					</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
