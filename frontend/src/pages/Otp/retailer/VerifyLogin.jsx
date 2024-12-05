import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/VerifyOtp.css";
import { useDispatch, useSelector } from "react-redux";

import toastOptions from "../../../constants/toast";
import { toast } from "react-toastify";
import { retailerLoginVerify, retailerLoginVerifyResend } from "../../../redux/Actions/retailerActions";

const VerifyLogin = () => {
	const spans = Array.from({ length: 128 });

	const [otp, setOtp] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();

	const { loading, message, error, isRetailerAuthenticated } = useSelector(
		(state) => state.retailerAuth
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(otp);
		if (otp / 100000 < 1) {
			toast.error("OTP must contain 6 digits", toastOptions);
			return;
		}
		dispatch(retailerLoginVerify(id, otp));
	};
	const handleResendOtp = () => {
		dispatch(retailerLoginVerifyResend(id));
	};

	useEffect(() => {
		if (isRetailerAuthenticated) {
			return navigate("/retailerDashboard");
		}

		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			// console.log()
		}
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, error, message, navigate, isRetailerAuthenticated]);

	return (
		<section>
			<div className="signup-cont">
				{spans.map((_, index) => (
					<span key={index} className="span"></span>
				))}
				<div className="signin" style={{ width: "400px" }}>
					<div className="content">
						<h2>Enter OTP</h2>
						<form className="form" onSubmit={handleSubmit}>
							<div className="inputBx">
								<input
									type="number"
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
									required
								/>
								<i>OTP</i>
							</div>
							<div className="links">
								<Link to={`/retailer/login/verify/${id}`} onClick={handleResendOtp}>
									Resend OTP
								</Link>
							</div>
							<div className="inputBx">
								<button type="submit">
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
		</section>
	);
};

export default VerifyLogin;
