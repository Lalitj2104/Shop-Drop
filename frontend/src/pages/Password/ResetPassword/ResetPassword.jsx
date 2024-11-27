import { useEffect, useState } from "react";
import "../../../styles/ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetUserPassword } from "../../../redux/Actions/userActions";
import { toast } from "react-toastify";
import toastOptions from "../../../constants/toast";

const OtpPage = () => {
	const [otp, setOtp] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();

	const { loading, message, error } = useSelector((state) => state.userAuth);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("OTP Submitted:", otp);
		dispatch(resetUserPassword(id, otp));
	};

	useEffect(() => {
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			navigate(`/changePassword/${id}`);
		}

		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, message, error, navigate]);

	return (
		<div className="otp-cont">
			<div className="otp-box">
				<div className="content">
					<h2>Reset Password</h2>
					<form onSubmit={handleSubmit} className="form">
						<div className="inputBx">
							<input
								type="text"
								placeholder="Enter OTP"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								required
							/>
						</div>
						<div className="inputBx">
							<button type="submit" className="btn" disabled={loading}>
								{loading === true ? (
									<span className="spinner"></span>
								) : (
									"Submit"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OtpPage;
