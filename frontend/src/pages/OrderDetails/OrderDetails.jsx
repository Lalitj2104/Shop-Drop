import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/RetailerOrderDetails.css";
import { getOrderByRetailer} from "../../redux/Actions/orderAction";
import RetailerSidebar from "../../components/RetailerSidebar/RetailerSidebar";

function OrderDetails() {
	const { orderId } = useParams();
    const dispatch = useDispatch();
    const { Retailer } = useSelector((state) => state.retailerAuth);
	const { order, error, message } = useSelector((state) => state.orderAuth);

	useEffect(() => {
		// Fetch order details
		dispatch(getOrderByRetailer(orderId));
	}, [dispatch, orderId]);

	useEffect(() => {
		if (message) {
			dispatch({ type: "CLEAR_MESSAGE" });
		}
		if (error) {
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [message, error]);

	return (
		<div className="order-details-page">
			<RetailerSidebar retailer={Retailer} />
			<h2>Order Details</h2>
			{order ? (
				<div className="order-details">
					<p>
						<strong>Order ID:</strong> {order._id}
					</p>
					<p>
						<strong>Date:</strong>{" "}
						{new Date(order.createdAt).toLocaleDateString()}
					</p>
					<p>
						<strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
					</p>
					<p>
						<strong>Status:</strong> {order.status}
					</p>
					<p>
						<strong>Shipping Address:</strong> {order.shippingAddress}
					</p>
					<h3>Products</h3>
					<ul>
						{order.products.map((product, index) => (
							<li key={index}>
								<p>
									<strong>Product ID:</strong> {product.productId}
								</p>
								<p>
									<strong>Quantity:</strong> {product.quantity}
								</p>
								<p>
									<strong>Price:</strong> ₹{product.price.toFixed(2)}
								</p>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>Loading order details...</p>
			)}
		</div>
	);
}

export default OrderDetails;
