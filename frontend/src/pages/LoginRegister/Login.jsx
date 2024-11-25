import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faGoogle,
	faTwitter,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import ImgUser from "../../images/LoginRegister/user.png";
import ImgLock from "../../images/LoginRegister/lock.png";
import ImgEye from "../../images/LoginRegister/eye.png";
import ImgEyeHide from "../../images/LoginRegister/eye-hide.png";
import ImgUsers from "../../images/LoginRegister/users.png";

const Login = ({
	username,
	password,
	token,
	gstNumber,
	signInRole,
	toggleForm,
	onChange,
	onForgotPassword,
}) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isEyeImage, setIsEyeImage] =useState(true);

	const togglePasswordVisibility = () => {
		setIsPasswordShown(!isPasswordShown);
		setIsEyeImage(!isEyeImage);
	};

	return (
		<form className="sign-in-form">
			<h2 className="title">Sign in</h2>
			<div className="input-field">
				<img src={ImgUsers} className="fas" alt="Role" />
				<select
					name="signInRole"
					value={signInRole}
					className="custom-dropdown"
					onChange={onChange}
				>
					<option value="user ">User </option>
					<option value="retailer">Retailer</option>
					<option value="admin">Admin</option>
				</select>
			</div>
			<div className="input-field">
				<img src={ImgUser} className="fas" alt="Username" />
				<input
					type="text"
					name="username"
					value={username}
					placeholder="Username"
					onChange={onChange}
				/>
			</div>
			<div className="input-field">
				<img src={ImgLock} className="fas" alt="Password" />
				<input
					type={isPasswordShown ? "text" : "password"}
					name="password"
					value={password}
					placeholder="Password"
					onChange={onChange}
				/>
				<img
					src={isEyeImage ? ImgEye : ImgEyeHide}
					className="eye"
					onClick={togglePasswordVisibility}
					alt="Toggle Password Visibility"
				/>
			</div>
			{signInRole === "admin" && (
				<div className="input-field">
					<img src={ImgLock} className="fas" alt="Admin Token" />
					<input
						type="text"
						name="token"
						value={token}
						placeholder="Admin Token"
						onChange={onChange}
					/>
				</div>
			)}
			
			<input type="submit" value="Login" className="btn solid" />
			<p className="forgot-password" onClick={onForgotPassword}>
				Forgot Password?
			</p>
			<p className="social-text"> or Sign in with social platforms </p>
			<div className="social-media">
				<a href="#" className="social-icon">
					<FontAwesomeIcon icon={faFacebook} />
				</a>
				<a href="#" className="social-icon">
					<FontAwesomeIcon icon={faTwitter} />
				</a>
				<a href="#" className="social-icon">
					<FontAwesomeIcon icon={faGoogle} />
				</a>
				<a href="#" className="social-icon">
					<FontAwesomeIcon icon={faLinkedin} />
				</a>
			</div>
			<p className="toggle-action" onClick={toggleForm}>
				Don't have an account yet? Sign up
			</p>
		</form>
	);
};

export default Login;
