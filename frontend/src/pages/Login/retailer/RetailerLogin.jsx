import { useEffect, useState } from "react";
import "../../../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toastOptions from "../../../constants/toast";
import { toast } from "react-toastify";
import { retailerLogin } from "../../../redux/Actions/retailerActions";

const RetailerLogin = () => {
	const spans = Array.from({ length: 128 });
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { rloading, message, error, id, isRetailerAuthenticated } = useSelector(
		(state) => state.retailerAuth
	);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
		dispatch(retailerLogin(email, password));
	};

	useEffect(() => {
		if (isRetailerAuthenticated) {
			return navigate("/retailerDashboard");
		}
		if (message) {
			console.log(message);
			toast.success(message, toastOptions);
			
			dispatch({
				type: "CLEAR_MESSAGE",
			});
			navigate(`/retailer/login/verify/${id}`);
		}
		if (error) {
			console.log(error);
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, message, error, isRetailerAuthenticated, id, navigate]);

	return (
		<section>
			<div className="login-cont">
				{spans.map((_, index) => (
					<span key={index} className="span"></span>
				))}
				<div className="signin">
					<div className="content">
						<h2>Login</h2>
						<form className="form" onSubmit={handleSubmit}>
							<div className="inputBx">
								<input
									type="email"
									value={email}
									placeholder=""
									onChange={(e) => setEmail(e.target.value)}
									required
									/>
									<i>Email</i>
							</div>
							<div className="inputBx">
								<input
									type="password"
									value={password}
									placeholder=""
									onChange={(e) => setPassword(e.target.value)}
									required
									/>
									<i>Password</i>
							</div>
							<div className="links">
								<Link to="/retailer/forgotPassword">Forgot Password?</Link>
								<Link to="/retailerRegister">Sign Up</Link>
							</div>
							<div className="inputBx">
								<button type="submit" disabled={rloading}>
									{rloading === true ? (
										<span className="spinner"></span>
									) : (
										"Login"
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

export default RetailerLogin;
