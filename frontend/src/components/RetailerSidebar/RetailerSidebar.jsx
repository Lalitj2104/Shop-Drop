import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/RetailerDashboard.css";
import { loadRetailer, logoutRetailer } from "../../redux/Actions/retailerActions";
import { useDispatch } from "react-redux";

const RetailerSidebar = ({ retailer }) => {
	
	const dispatch=useDispatch();
	const logoutHandler=()=>{
		dispatch(logoutRetailer());
	}
	useEffect(()=>{
		loadRetailer();
	},[dispatch])
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
					<Link to="/processingOrders">Processing Orders</Link>
				</li>
				<li>
					<Link to="/shippedOrders">Shipped Orders</Link>
				</li>
				<li>
					<Link to="/completedOrders">Completed Orders</Link>
				</li>
				<li>
					<Link to="/cancelledOrders">Cancelled Orders</Link>
				</li>
			</ul>
			<button className="logout-btn" onClick={logoutHandler}>Logout</button>
		</div>
	);
};

export default RetailerSidebar;
