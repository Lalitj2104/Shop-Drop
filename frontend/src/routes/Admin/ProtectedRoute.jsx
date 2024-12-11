import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toastOptions from "../../constants/toast";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
	
	const {isAuthenticated}=useSelector((state)=>state.adminAuth);
	// const dispatch = useDispatch();
	

	return isAuthenticated ? children :<Navigate to="/admin/login" />;
};

export default ProtectedRoute;
