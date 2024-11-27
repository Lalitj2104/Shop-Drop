import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import ForgotPassword from "../pages/Password/ForgotPassword/ForgotPassword";
import VerifyOtp from "../pages/Otp/VerifyOtp/VerifyOtp";
import ResetPassword from "../pages/Password/ResetPassword/ResetPassword";
import RetailerDashboard from "../pages/RetailerDashboard/RetailerDashboard";
import Login from "../pages/Login/user/Login";
import RegisterLogin from "../pages/Login/retailer/RetailerLogin";
import Register from "../pages/Register/user/Register";
import RetailerRegister from "../pages/Register/Retailer/RetailerRegister";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";
import ChangePassword from "../pages/Password/ChangePassword/ChangePassword";

const Path = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);
	return (
		<div>
			<Router>
				{loading ? (
					<Loading />
				) : (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/retailerLogin" element={<RegisterLogin />} />
						<Route path="/register" element={<Register />} />
						<Route path="retailerRegister" element={<RetailerRegister />} />
						<Route path="/forgotPassword" element={<ForgotPassword />} />
						<Route path="/verify/:id" element={<VerifyOtp />} />
						<Route path="/reset/:id" element={<ResetPassword />} />
						<Route path="/retailerDashboard" element={<RetailerDashboard />} />
						<Route path="/changePassword/:id" element={<ChangePassword/>} />
					</Routes>
				)}
			</Router>
		</div>
	);
};

export default Path;
