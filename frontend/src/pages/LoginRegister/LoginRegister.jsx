import { Component } from "react";
import SignInForm from "./Login";
import SignUpForm from "./Register";
import "../../styles/LoginRegister.css";
import Img01 from "../../images/LoginRegister/bg1.svg";
import Img02 from "../../images/LoginRegister/bg2.svg";

class LoginRegister extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: props.formType === "login" ? true : false, // Tracks active form (true: Login, false: Register)
			signInRole: "user",
			userType: "user",
			username: "",
			password: "",
			token: "",
			gstNumber: "",
			email: "",
			firstName: "",
			middleName: "",
			lastName: "",
			companyName: "",
			mobile: "",
			dob: "",
			gender: "",
		};
	}

	// Toggles between Login and Register forms
	toggleForm = () => {
		this.setState({ isActive: !this.state.isActive });
	};

	// Handles input changes
	onChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { isActive } = this.state;

		return (
			<div className="Login-Section">
				{/* Dynamically adds 'sign-up-mode' class for toggling */}
				<div
					className={
						isActive ? "login-container" : "login-container sign-up-mode"
					}
					id="container"
				>
					<div className="forms-container">
						<div className="signin-signup">
							{isActive ? (
								<SignInForm
									{...this.state}
									toggleForm={this.toggleForm} // Pass toggleForm to child
									onChange={this.onChange} // Pass input handler to child
								/>
							) : (
								<div className="signup-form-wrapper">
									<SignUpForm
										{...this.state}
										toggleForm={this.toggleForm} // Pass toggleForm to child
										onChange={this.onChange} // Pass input handler to child
									/>
								</div>
							)}
						</div>
					</div>
					{/* Panels for aesthetic toggle buttons */}
					<div className="panels-container">
						<div className="panel left-panel">
							<div className="content">
								<h3>New Here?</h3>
								<p>Create an account and join our community.</p>
								<button className="btn transparent" onClick={this.toggleForm}>
									Sign Up
								</button>
							</div>
							<img src={Img01} className="image" alt="Background" />
						</div>
						<div className="panel right-panel">
							<div className="content">
								<h3>Welcome Back!</h3>
								<p>Log in to continue and explore our services.</p>
								<button className="btn transparent" onClick={this.toggleForm}>
									Sign In
								</button>
							</div>
							<img src={Img02} className="image" alt="Background" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginRegister;
