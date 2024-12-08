import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";
import { Link } from "react-router-dom";
import "../../styles/RetailerOrder.css"

// Static orders data
const staticOrdersData = [
	{
		id: "ORD001",
		date: "2024-12-05",
		totalAmount: 1999.99,
		status: "Pending",
	},
	{
		id: "ORD002",
		date: "2024-12-03",
		totalAmount: 1499.99,
		status: "Completed",
	},
	{
		id: "ORD003",
		date: "2024-12-02",
		totalAmount: 799.99,
		status: "Shipped",
	},
];

function RetailerOrders() {
	// const dispatch = useDispatch();
	// const { orders, message, error } = useSelector(
	// 	(state) => state.retailerOrders
	// );

	// Fetch orders on component mount
	useEffect(() => {
		// dispatch(getRetailerOrders());
	}, []);

	// Handle errors or success messages
	useEffect(() => {
		// if (message) {
		// 	toast.success(message, toastOptions);
		// }
		// if (error) {
		// 	toast.error(error, toastOptions);
		// }
	}, []);

	return (
		<div className="retailer-orders-page">
			{/* Sidebar */}
			<div className="retailer-dashboard-sidebar">
				{/* Sidebar Content can be reused from RetailerDashboard component */}
				<div className="retailer-dashboard-profile">
					<h3>Retailer Name</h3>
					<p>Retailer ID: RET001</p>
				</div>
				<div className="retailer-dashboard-menu">
					<ul>
						<li>
							<Link to="/retailer-dashboard" className="sidebar-link">
								Dashboard
							</Link>
						</li>
						<li>
							<Link to="/retailer-orders" className="sidebar-link active">
								My Orders
							</Link>
						</li>
						<li>
							<Link to="/retailer-products" className="sidebar-link">
								Manage Products
							</Link>
						</li>
						<li>
							<Link to="/retailer-profile" className="sidebar-link">
								Profile
							</Link>
						</li>
						<li>
							<Link to="/logout" className="sidebar-link">
								Logout
							</Link>
						</li>
					</ul>
				</div>
			</div>

			{/* Main Content */}
			<div className="retailer-orders-content">
				<div className="top-bar">
					<h2>My Orders</h2>
				</div>

				<div className="orders-list">
					{staticOrdersData.length === 0 ? (
						<p>No orders available.</p>
					) : (
						staticOrdersData.map((order) => (
							<div className="order-item" key={order.id}>
								<h3>Order ID: {order.id}</h3>
								<p>Date: {new Date(order.date).toLocaleDateString()}</p>
								<p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
								<p>Status: {order.status}</p>
								<div className="order-buttons">
									<Link to={`/orderDetails/${order.id}`}>
										<button className="view-order-btn">View Order</button>
									</Link>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default RetailerOrders;
