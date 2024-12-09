import React from "react";
import { Link } from "react-router-dom";
import "../../styles/RetailerDashboard.css";

const RetailerSidebar = ({ retailer }) => {
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
			<button className="logout-btn">Logout</button>
		</div>
	);
};

export default RetailerSidebar;
