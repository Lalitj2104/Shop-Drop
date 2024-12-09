
import { Link } from "react-router-dom";
import "../../styles/RetailerOrder.css";
import RetailerSidebar from "../../components/RetailerSidebar/RetailerSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderByStatus } from "../../redux/Actions/orderAction";

// Static pending orders data
// const pendingOrdersData = [
// 	{
// 		id: "ORD001",
// 		date: "2024-12-05",
// 		totalAmount: 1999.99,
// 		status: "Pending",
// 	},
// 	{
// 		id: "ORD004",
// 		date: "2024-12-07",
// 		totalAmount: 499.99,
// 		status: "Pending",
// 	},
// ];

function PendingOrders() {
    // const [orders, setOrders] = useState(pendingOrdersData);
    const {Retailer} = useSelector(state => state.retailerAuth);
	const {orders}=useSelector(state => state.orderAuth);
	const dispatch=useDispatch();
	useEffect(()=>{
		dispatch(getOrderByStatus("Pending"));
	},[dispatch]);

	const updateStatus = (orderId) => {
		// Update status logic here
		setOrders((prevOrders) =>
			prevOrders.map((order) =>
				order.id === orderId ? { ...order, status: "Completed" } : order
			)
		);
	};

	return (
		<div className="retailer-orders-page">
			{/* Sidebar */}
			<RetailerSidebar retailer={Retailer} />

			{/* Main Content */}
			<div className="retailer-orders-content">
				<div className="top-bar">
					<h2>Pending Orders</h2>
				</div>

				<div className="orders-list">
					{orders.length === 0 ? (
						<p>No pending orders available.</p>
					) : (
						orders.map((order) => (
							<div className="order-item" key={order.id}>
								<h3>Order ID: {order.id}</h3>
								<p>Date: {new Date(order.date).toLocaleDateString()}</p>
								<p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
								<p>Status: {order.status}</p>
								<div className="order-buttons">
									<Link to={`/orderDetails/${order.id}`}>
										<button className="view-order-btn">View Order</button>
									</Link>
									{/* Update Status Button */}
									{order.status === "Pending" && (
										<button
											className="update-status-btn"
											onClick={() => updateStatus(order.id)}
										>
											Update Status
										</button>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default PendingOrders;
