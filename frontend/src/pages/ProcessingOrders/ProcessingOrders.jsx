import { Link } from "react-router-dom";
import "../../styles/RetailerOrder.css";
import RetailerSidebar from "../../components/RetailerSidebar/RetailerSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByStatus, updateOrderStatus } from "../../redux/Actions/orderAction";

function ProcessingOrders() {
	const { Retailer } = useSelector((state) => state.retailerAuth);
	const { orders } = useSelector((state) => state.orderAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrderByStatus("Processing"));
	}, [dispatch]);

	const updateStatus = (orderId) => {
		const newStatus = "Shipped"; // The next status in the flow
		dispatch(updateOrderStatus(orderId, newStatus));
	};

	return (
		<div className="retailer-orders-page">
			{/* Sidebar */}
			<RetailerSidebar retailer={Retailer} />

			{/* Main Content */}
			<div className="retailer-orders-content">
				<div className="top-bar">
					<h2>Processing Orders</h2>
				</div>

				<div className="orders-list">
					{orders?.length === 0 ? (
						<p>No processing orders available.</p>
					) : (
						orders &&
						orders?.map((order) => (
							<div className="order-item" key={order.id}>
								<h3>Order ID: {order?._id}</h3>
								<p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
								<p>Total Amount: ₹{order?.totalAmount.toFixed(2)}</p>
								<p>Status: {order.status}</p>
								<div className="order-buttons">
									<Link to={`/orderDetails/${order.id}`}>
										<button className="view-order-btn">View Order</button>
									</Link>
									{/* Update Status Button */}
									{order?.status === "Processing" && (
										<button
											className="update-status-btn"
											onClick={() => updateStatus(order?._id)}
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

export default ProcessingOrders;
