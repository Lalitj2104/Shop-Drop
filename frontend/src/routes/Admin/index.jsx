import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from  "../../pages/Admin/Admin"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AdminLoginPage from "../../pages/Login/Adminn/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";



const AdminPath = () => {
	const dispatch = useDispatch();
	// const { adminLoading } = useSelector((state) => state.AdminAuth);
	useEffect(() => {
		// dispatch(loadAdmin());
	}, []);
	return (
		<div>
			<Router>
				
					<Routes>
						<Route
							path="/admin"
							element={
								<ProtectedRoute><Admin /></ProtectedRoute>
									
							}
						/>
						<Route
							path="/admin/login"
							element={
								<AuthRoute><AdminLoginPage /></AuthRoute>
									
							}
						/>
						
                    </Routes>
			</Router>
		</div>
	);
};

export default AdminPath;
