import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home.jsx";
import ForgotPassword from "../../pages/Password/ForgotPassword/ForgotPassword.jsx";
import VerifyOtp from "../../pages/Otp/VerifyOtp/VerifyOtp.jsx";
import ResetPassword from "../../pages/Password/ResetPassword/ResetPassword.jsx";
import RetailerDashboard from "../../pages/RetailerDashboard/RetailerDashboard.jsx";
import Login from "../../pages/Login/user/Login.jsx";
import RegisterLogin from "../../pages/Login/retailer/RetailerLogin.jsx";
import Register from "../../pages/Register/user/Register.jsx";
import RetailerRegister from "../../pages/Register/Retailer/RetailerRegister.jsx";
import AuthRoute from "./AuthRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingPage from "../../components/Loading/LoadingPage.jsx";
import { loadUser } from "../../redux/Actions/userActions.js";
import ChangePassword from "../../pages/Password/ChangePassword/ChangePassword.jsx";
import AddAddress from "../../pages/Address/AddAddress.jsx";
import Account from "../../pages/YourAccount/Account.jsx";
import Order from "../../pages/Orders/Orders.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ContactUs from "../../pages/ContactUs/ContactUs.jsx";
import LoginSecurity from "../../pages/LoginSecurity/LoginSecurity.jsx";
import Paymentoptions from "../../pages/PaymentOptions/PaymentOptions.jsx";

const Path = () => {
	const dispatch = useDispatch();
	const { userLoading } = useSelector((state) => state.userAuth);

	useEffect(() => {
		dispatch(loadUser());
	}, []);
	return (
		<div>
			<Router>
				{userLoading ? (
					<LoadingPage />
				) : (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/login"
							element={
								<AuthRoute>
									<Login />
								</AuthRoute>
							}
						/>
						<Route
							path="/retailerLogin"
							element={
								<AuthRoute>
									<RegisterLogin />
								</AuthRoute>
							}
						/>
						<Route
							path="/register"
							element={
								<AuthRoute>
									<Register />
								</AuthRoute>
							}
						/>
						<Route
							path="retailerRegister"
							element={
								<AuthRoute>
									<RetailerRegister />
								</AuthRoute>
							}
						/>
						<Route
							path="/forgot-Password"
							element={
								<AuthRoute>
									<ForgotPassword />
								</AuthRoute>
							}
						/>
						<Route
							path="/verify/:id"
							element={
								<AuthRoute>
									<VerifyOtp />
								</AuthRoute>
							}
						/>
						<Route
							path="/reset/:id"
							element={
								<AuthRoute>
									<ResetPassword />
								</AuthRoute>
							}
						/>
						<Route
							path="/changePassword/:id"
							element={
								<AuthRoute>
									<ChangePassword />
								</AuthRoute>
							}
						/>
						
						<Route path="/AddAddress" element={<AddAddress />} />
						<Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
						<Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
						<Route path="/ContactUs" element={<ContactUs/>}/>
						<Route path="/LoginSecurity" element={<LoginSecurity/>}/>
						<Route path="/PaymentOptions" element={<Paymentoptions/>}/>
					</Routes>
				)}
			</Router>
		</div>
	);
};

export default Path;
