import {useParams} from "react-router-dom";
import "../../styles/RetailerOrderDetails.css";
import RetailerSidebar from "../../components/RetailerSidebar/RetailerSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById, updateOrderStatus } from "../../redux/Actions/orderAction";

function OrderDetails() {
	const { Retailer } = useSelector((state) => state.retailerAuth);
	const { order } = useSelector((state) => state.orderAuth);
	const { orderId } = useParams(); // Get the order ID from the URL
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrderById(orderId)); // Fetch order details using the order ID
	}, [dispatch, orderId]);

	console.log(order);

	return (
		<div className="order-details-page">
			{/* Sidebar */}
			<RetailerSidebar retailer={Retailer} />

			{/* Main Content */}
			<div className="order-details-content">
				<div className="top-bar">
					<h2>Order Details</h2>
				</div>

				{order ? (
					<div className="order-details">
						<h3>Order ID: {order?._id}</h3>
						<p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
						<p>Total Amount: ₹{order?.totalAmount.toFixed(2)}</p>
						<p>Status: {order?.status}</p>
						<p>Payment Method: {order?.paymentMethod}</p>
						<p>Payment Status: {order?.paymentStatus}</p>

						<h4>Customer Information</h4>
						<ul>
							<li>
								<strong>Name:</strong> {order?.userId?.firstName}{" "}
								{order?.userId?.middleName}{" "} {order?.userId?.lastName}
							</li>
							<li>
								<strong>Email:</strong> {order?.userId?.email}
							</li>
							<li>
								<strong>Phone:</strong> {order?.userId?.mobile}
							</li>
							<li>
								<strong>Address:</strong> {order?.shippingAddress}
							</li>
						</ul>

						<h4>Items</h4>
						<ul>
							{order?.products?.map((item) => (
								<li key={item.productId}>
									{item?.name} - ₹{item.price.toFixed(2)} x {item.quantity}
								</li>
							))}
						</ul>

						{/* Update Order Status */}
						{order?.status === "Shipped" && (
							<button
								className="update-status-btn"
								onClick={() => updateOrderStatus(order?._id)}
							>
								Update Status to Delivered
							</button>
						)}
					</div>
				) : (
					<p>Loading order details...</p>
				)}
			</div>
		</div>
	);
}

export default OrderDetails;
