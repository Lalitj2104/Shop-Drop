import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import ForgotPassword from "../pages/Password/ForgotPassword/ForgotPassword";
import VerifyOtp from "../pages/Otp/VerifyOtp/VerifyOtp";
import ResetPassword from "../pages/Password/ResetPassword/ResetPassword";
import RetailerDashboard from "../pages/RetailerDashboard/RetailerDashboard";
import Login from "../Login/user/Login";
import RetailerLogin from "../Login/retailer/RetailerLogin";
import Register from "../Register/user/Register";
import RetailerRegister from "../Register/Retailer/RetailerRegister";

const Path = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login/>} />
					<Route path="/retailerLogin" element={<RetailerLogin/>} />
					<Route path="/register" element={<Register/>} />
					<Route path="retailerRegister" element={<RetailerRegister/>}/>
					<Route path="/forgot-Password" element={<ForgotPassword />} />
					<Route path="/verify/:id" element={<VerifyOtp />} />
					<Route path="/reset/:id" element={<ResetPassword />} />
					<Route path="/retailerDashboard" element={<RetailerDashboard />} />
				</Routes>
			</Router>
		</div>
	);
};

export default Path;
