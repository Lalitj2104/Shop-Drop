import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home.jsx";
import ForgotPassword from "../../pages/Password/ForgotPassword/ForgotPassword.jsx";
import VerifyOtp from "../../pages/Otp/VerifyOtp/VerifyOtp.jsx";
import ResetPassword from "../../pages/Password/ResetPassword/ResetPassword.jsx";
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
import ProtectedRoute from "./ProtectedRoute.jsx";
import ContactUs from "../../pages/ContactUs/ContactUs.jsx";
import LoginSecurity from "../../pages/LoginSecurity/LoginSecurity.jsx";
import Paymentoptions from "../../pages/PaymentOptions/PaymentOptions.jsx";
import ProductList from "../../pages/Product/User/ProductList.jsx";
import ProductPage from "../../pages/Product/User/ProductPage.jsx";
import OrderList from "../../pages/Orders/OrderList.jsx";
import OrderDetails from "../../pages/Orders/OrderDetails.jsx";
import AddressPage from "../../pages/Address/AddressPage.jsx";
import CartPage from "../../pages/Cart/Cart.jsx";

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
							path="/register"
							element={
								<AuthRoute>
									<Register />
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

						<Route
							path="/AddAddress"
							element={
								<ProtectedRoute>
									<AddAddress />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/account"
							element={
								<ProtectedRoute>
									<Account />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/orders"
							element={
								<ProtectedRoute>
									<OrderList />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/order/:id"
							element={
								<ProtectedRoute>
									<OrderDetails />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/ContactUs"
							element={
								<ProtectedRoute>
									<ContactUs />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/LoginSecurity"
							element={
								<ProtectedRoute>
									<LoginSecurity />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/PaymentOptions"
							element={
								<ProtectedRoute>
									<Paymentoptions />
								</ProtectedRoute>
							}
						/>

						<Route path="/shop" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
						<Route path="/product/:id" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
						<Route path="/yourAddress" element={<ProtectedRoute><AddressPage /></ProtectedRoute>} />
						<Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
					</Routes>
				)}
			</Router>
		</div>
	);
};

export default Path;
