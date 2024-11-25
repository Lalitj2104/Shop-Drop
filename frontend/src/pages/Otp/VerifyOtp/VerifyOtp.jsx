import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/VerifyOtp.css";

const VerifyOtp = () => {
	const [otp, setOtp] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (otp.length === 6) {
			setMessage("OTP verified successfully!");
			setTimeout(() => navigate("/reset-password"), 2000);
		} else {
			setMessage("Please enter a valid 6-digit OTP.");
		}
	};

	return (
		<div className="enter-otp-container">
			<div className="form-box">
				<h2>Enter OTP</h2>
				<p>Enter the OTP sent to your email address.</p>
				<form onSubmit={handleSubmit}>
					<div className="floating-label">
						<input
							type="text"
							placeholder="Enter OTP"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							required
						/>
						<label>OTP</label>
					</div>
					<button type="submit" className="btn primary-btn">
						Verify OTP
					</button>
				</form>
				{message && (
					<p className={`message ${otp.length === 6 ? "success" : "error"}`}>
						{message}
					</p>
				)}
			</div>
		</div>
	);
};

export default VerifyOtp;
