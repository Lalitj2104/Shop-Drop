const Register = ({
	firstName,
	middleName,
	lastName,
	email,
	password,
	username,
	mobile,
	dob,
	gender,
	userType,
	gstNumber,
	companyName,
	toggleForm,
	onChange,
}) => {
	return (
		<form className="sign-up-form">
			<h2 className="title">Sign up</h2>

			{/* User Type Dropdown */}
			<div className="input-row">
				<div className="input-field">
					<select
						name="userType"
						value={userType}
						className="custom-dropdown"
						onChange={onChange}
					>
						<option value="user">User</option>
						<option value="retailer">Retailer</option>
					</select>
				</div>

				<div className="input-field">
					<input
						type="text"
						name="username"
						value={username}
						placeholder="Username"
						onChange={onChange}
					/>
				</div>
			</div>

			{/* First Name, Middle Name, Last Name in one row */}
			<div className="input-row">
				<div className="input-field">
					<input
						type="text"
						name="firstName"
						value={firstName}
						placeholder="First Name"
						onChange={onChange}
					/>
				</div>
				<div className="input-field">
					<input
						type="text"
						name="middleName"
						value={middleName}
						placeholder="Middle Name"
						onChange={onChange}
					/>
				</div>
				<div className="input-field">
					<input
						type="text"
						name="lastName"
						value={lastName}
						placeholder="Last Name"
						onChange={onChange}
					/>
				</div>
			</div>

			{/* Email and Password in one row */}
			<div className="input-row">
				<div className="input-field">
					<input
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						onChange={onChange}
					/>
				</div>
				<div className="input-field">
					<input
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						onChange={onChange}
					/>
				</div>

				<div className="input-field">
					<input
						type="text"
						name="mobile"
						value={mobile}
						placeholder="Mobile"
						onChange={onChange}
					/>
				</div>
			</div>

			{/* Mobile */}

			<div className="input-row">
				<div className="input-field">
					<input
						type="date"
						name="dob"
						value={dob}
						placeholder="Date of Birth"
						onChange={onChange}
					/>
				</div>

				{/* Gender Dropdown */}
				<div className="input-field">
					<select
						name="gender"
						value={gender}
						className="custom-dropdown"
						onChange={onChange}
					>
						<option value="">Select Gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>
			</div>

			{/* Conditional Fields for Retailer */}
			{userType === "retailer" && (
				<>
					<div className="input-row">
						<div className="input-field">
							<input
								type="text"
								name="gstNumber"
								value={gstNumber}
								placeholder="GST Number"
								onChange={onChange}
							/>
						</div>
						<div className="input-field">
							<input
								type="text"
								name="companyName"
								value={companyName}
								placeholder="Company Name"
								onChange={onChange}
							/>
						</div>
					</div>
				</>
			)}

			{/* Conditional Field for User */}
			{/* {userType === "user" && (
        
      )} */}

			{/* Submit Button */}
			<input type="submit" value="Sign Up" className="btn solid" />

			{/* Toggle Form */}
			<p className="toggle-action" onClick={toggleForm}>
				Already have an account? Sign in
			</p>
		</form>
	);
};

export default Register;
