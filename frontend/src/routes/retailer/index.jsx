import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RetailerDashboard from "../../pages/RetailerDashboard/RetailerDashboard";
import RetailerRegister from "../../pages/Register/Retailer/RetailerRegister";
import RetailerLogin from "../../pages/Login/retailer/RetailerLogin";
import VerifyRegister from "../../pages/Otp/retailer/verifyRegister";
import VerifyLogin from "../../pages/Otp/retailer/VerifyLogin";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import OtpRetailerPage from "../../pages/Password/ResetPassword/ResetRetailerPassword";
import ForgotRetailerPassword from "../../pages/Password/ForgotPassword/ForgotRetailerPassword";
import ChangeRetailerPassword from "../../pages/Password/ChangePassword/ChangeRetailerPassword";
import { useDispatch, useSelector } from "react-redux";
import { loadRetailer } from "../../redux/Actions/retailerActions";
import LoadingPage from "../../components/Loading/LoadingPage";
import { useEffect } from "react";
import AddProduct from "../../pages/Product/Retailer/AddProduct";
import UpdateProduct from "../../pages/Product/Retailer/UpdateProduct";
import RetailerOrders from "../../pages/RetailerOrders/RetailerOrders";
import PendingOrders from "../../pages/PendingOrders/PendingOrders";
import CompletedOrders from "../../pages/CompletedOrders/CompletedOrders";

const RetailerPath = () => {
	const dispatch = useDispatch();
	const { retailerLoading } = useSelector((state) => state.retailerAuth);
	useEffect(() => {
		dispatch(loadRetailer());
	}, []);
	return (
		<div>
			<Router>
				{retailerLoading ? (
					<LoadingPage />
				) : (
					<Routes>
						<Route
							path="/retailerDashboard"
							element={
								<ProtectedRoute>
									<RetailerDashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/addProduct"
							element={
								<ProtectedRoute>
									<AddProduct />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/updateProduct/:id"
							element={
								<ProtectedRoute>
									<UpdateProduct />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/retailerRegister"
							element={
								<AuthRoute>
									<RetailerRegister />
								</AuthRoute>
							}
						/>
						<Route
							path="/retailerLogin"
							element={
								<AuthRoute>
									<RetailerLogin />
								</AuthRoute>
							}
						/>
						<Route
							path="/retailer/verify/:id"
							element={
								<AuthRoute>
									<VerifyRegister />
								</AuthRoute>
							}
						/>
						<Route
							path="/retailer/Login/verify/:id"
							element={
								<AuthRoute>
									<VerifyLogin />
								</AuthRoute>
							}
						/>
						<Route
							path="/retailer/reset/:id"
							element={
								<AuthRoute>
									<OtpRetailerPage />
								</AuthRoute>
							}
						/>
						<Route
							path="/retailer/changePassword/:id"
							element={
								<AuthRoute>
									<ChangeRetailerPassword />
								</AuthRoute>
							}
						/>
						<Route
							path="/retailer/forgotPassword"
							element={
								<AuthRoute>
									<ForgotRetailerPassword />
								</AuthRoute>
							}
						/>

						<Route
							path="/orders"
							element={
								<ProtectedRoute>
									<RetailerOrders />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/pendingOrders"
							element={
								<ProtectedRoute>
									<PendingOrders />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/completedOrders"
							element={
								<ProtectedRoute>
									<CompletedOrders />
								</ProtectedRoute>
							}
						/>
						
					</Routes>
				)}
			</Router>
		</div>
	);
};

export default RetailerPath;
