import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RetailerDashboard from "../../pages/RetailerDashboard/RetailerDashboard";
import AddProduct from "../../pages/Product/AddProduct";
import UpdateProduct from "../../pages/Product/UpdateProduct";
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
            path="/updateProduct"
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
        </Routes>
		)}
      </Router>
    </div>
  );
};

export default RetailerPath;
