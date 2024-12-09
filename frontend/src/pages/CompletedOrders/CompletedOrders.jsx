import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";
import { Link } from "react-router-dom";
import "../../styles/RetailerOrder.css";
import RetailerSidebar from "../../components/RetailerSidebar/RetailerSidebar";

// Static completed orders data
const staticCompletedOrdersData = [
	{
		id: "ORD002",
		date: "2024-12-03",
		totalAmount: 1499.99,
		status: "Completed",
	},
	{
		id: "ORD004",
		date: "2024-11-28",
		totalAmount: 1999.99,
		status: "Completed",
	},
];

function CompletedOrders() {
	const { Retailer } = useSelector((state) => state.retailerAuth);

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
			<RetailerSidebar retailer={Retailer} />

			{/* Main Content */}
			<div className="retailer-orders-content">
				<div className="top-bar">
					<h2>Completed Orders</h2>
				</div>

				<div className="orders-list">
					{staticCompletedOrdersData.length === 0 ? (
						<p>No completed orders available.</p>
					) : (
						staticCompletedOrdersData.map((order) => (
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

export default CompletedOrders;
