import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/VerifyOtp.css";
import { useDispatch, useSelector } from "react-redux";
import {
	resendRegisterOtp,
	verifyRegisterOtp,
} from "../../../redux/Actions/userActions";
import toastOptions from "../../../constants/toast";
import { toast } from "react-toastify";

const VerifyOtp = () => {
	const spans = Array.from({ length: 128 });

	const [otp, setOtp] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();

	const { loading, message, error, isAuthenticated } = useSelector(
		(state) => state.userAuth
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(otp);
		if (otp / 100000 < 1) {
			toast.error("OTP must contain 6 digits", toastOptions);
			return;
		}
		dispatch(verifyRegisterOtp(id, otp));
	};

	const handleResendOtp = () => {
		dispatch(resendRegisterOtp(id));
	};

	useEffect(() => {
		if (isAuthenticated) {
			return navigate("/");
		}

		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
		}
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, error, message, navigate, isAuthenticated]);

	return (
		<section>
			<div className="otp-cont">
				{spans.map((_, index) => (
					<span key={index} className="span"></span>
				))}
				<div className="otp-box">
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
								<label>OTP</label>
							</div>
							<div className="links">
								<Link to={`/verify/${id}`} onClick={handleResendOtp}>
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

export default VerifyOtp;
