import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import ForgotPassword from "../pages/Password/ForgotPassword/ForgotPassword";
import VerifyOtp from "../pages/Otp/VerifyOtp/VerifyOtp";
import ResetPassword from "../pages/Password/ResetPassword/ResetPassword";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import RetailerDashboard from "../pages/RetailerDashboard/RetailerDashboard";

const Path = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginRegister formType="login" />} />
					<Route path="/register" element={<LoginRegister formType="register" />} />
					<Route path="/forgotPassword" element={<ForgotPassword />} />
					<Route path="/verify/:id" element={<VerifyOtp />} />
					<Route path="/reset/:id" element={<ResetPassword />} />
					<Route path="/retailerDashboard" element={<RetailerDashboard />} />
				</Routes>
			</Router>
		</div>
	);
};

export default Path;
