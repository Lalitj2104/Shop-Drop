import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/RetailerDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { loadRetailer, logoutRetailer } from "../../redux/Actions/retailerActions";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const RetailerSidebar = ({ retailer }) => {
	const dispatch=useDispatch();
	const {message,error}=useSelector(state=>state.retailerAuth);
	
	const submitHandler=()=>{
		dispatch(logoutRetailer());
	}
	useEffect(()=>{
		if(message=="Logout successful"){
			toast.success(message,toastOptions);
			loadRetailer();
			dispatch({type:"CLEAR_MESSAGE"});
		}
		if(error){
			toast.error(error,toastOptions);
			dispatch({type:"CLEAR_ERROR"});
		}
	},[message,error])
	return (
		<div className="retailer-dashboard-sidebar">
			<div className="retailer-dashboard-profile">
				<h3>Welcome,</h3>
				<h3>
					{retailer?.firstName} {retailer?.middleName} {retailer?.lastName}
				</h3>
				<p>{retailer?.location}</p>
			</div>
			<ul className="retailer-dashboard-menu">
				<li>
					<Link to="/retailerDashboard">Dashboard</Link>
				</li>
				<li>
					<Link to="/orders">My Orders</Link>
				</li>
				<li>
					<Link to="/pendingOrders">Pending Orders</Link>
				</li>
				<li>
					<Link to="/completedOrders">Completed Orders</Link>
				</li>
			</ul>
			<button className="logout-btn" onClick={submitHandler}>Logout</button>
		</div>
	);
};

export default RetailerSidebar;
