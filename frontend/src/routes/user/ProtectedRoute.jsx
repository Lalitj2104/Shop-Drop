import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toastOptions from "../../constants/toast";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, authError } = useSelector((state) => state.userAuth);

	const dispatch = useDispatch();
	useEffect(() => {
		if (authError) {
			toast.error(authError, toastOptions);
			dispatch({ type: "CLEAR_AUTH_ERROR" });
		}
	}, [authError]);

	return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
