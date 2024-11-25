import { useState } from "react";
import "../../../styles/ResetPassword.css";

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password && password === confirmPassword) {
			setMessage("Password reset successfully!");
			// Redirect to login or homepage
		} else {
			setMessage("Passwords do not match. Please try again.");
		}
	};

	return (
		<div className="reset-password-container">
			<div className="form-box">
				<h2>Reset Password</h2>
				<form onSubmit={handleSubmit}>
					<div className="input-field">
						<input
							type="password"
							placeholder="New Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label>New Password</label>
					</div>
					<div className="input-field">
						<input
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<label>Confirm Password</label>
					</div>
					<button type="submit" className="btn primary-btn">
						Reset Password
					</button>
				</form>
				{message && <p className="message">{message}</p>}
			</div>
		</div>
	);
};

export default ResetPassword;
