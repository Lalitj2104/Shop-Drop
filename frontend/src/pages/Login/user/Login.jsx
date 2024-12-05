import { useEffect, useState } from "react";
import "../../../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toastOptions from "../../../constants/toast";
import { toast } from "react-toastify";
import { loginUser } from "../../../redux/Actions/userActions";

const Login = () => {
	const spans = Array.from({ length: 128 });
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, message, error, id, isAuthenticated } = useSelector(
		(state) => state.userAuth
	);

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(email, password));
	};

	// Effect for authentication and toast notifications
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
		}
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, message, error, isAuthenticated, id, navigate]);

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
							{/* Email Input */}
							<div className="inputBx">
								<input
									type="email"
									value={email}
									placeholder=" "
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<i>Email</i>
							</div>

							{/* Password Input */}
							<div className="inputBx">
								<input
									type="password"
									value={password}
									placeholder=" "
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<i>Password</i>
							</div>

							{/* Links */}
							<div className="links">
								<Link to="/forgot-Password">Forgot Password?</Link>
								<Link to="/register">Sign Up</Link>
							</div>

							{/* Submit Button */}
							<div className="inputBx">
								<button type="submit" disabled={loading}>
									{loading ? <span className="spinner"></span> : "Login"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
