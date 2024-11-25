import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import ForgotPassword from "../pages/Password/ForgotPassword/ForgotPassword";
import VerifyOtp from "../pages/Otp/VerifyOtp/VerifyOtp";
import ResetPassword from "../pages/Password/ResetPassword/ResetPassword";

const Path = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/forgotPassword" element={<ForgotPassword />} />
					<Route path="/verify/:id" element={<VerifyOtp />} />
					<Route path="/reset/:id" element={<ResetPassword />} />
				</Routes>
			</Router>
		</div>
	);
};

export default Path;
