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
import AuthRoute from "./AuthRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingPage from "../components/Loading/LoadingPage";
import { loadUser } from "../redux/Actions/userActions";
import ChangePassword from "../pages/Password/ChangePassword/ChangePassword";
import AddAddress from "../pages/Address/AddAddress.jsx";


const Path = () => {
	const dispatch = useDispatch();
  const { userLoading } = useSelector(state => state.userAuth)

  useEffect(() => {
    dispatch(loadUser());
  }, [])
  return (
    <div>
      <Router>
	  {
          userLoading ? (
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
				<ChangePassword/>
			</AuthRoute>
		  }
		  />
          <Route path="/retailerDashboard" element={<RetailerDashboard />} />
		  <Route path="/AddAddress" element={<AddAddress />} />
        </Routes>
	)}
      </Router>
    </div>
  );
};

export default Path;
