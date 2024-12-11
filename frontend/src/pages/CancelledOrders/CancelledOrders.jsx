import { Link } from "react-router-dom";
import "../../styles/RetailerOrder.css";
import RetailerSidebar from "../../components/RetailerSidebar/RetailerSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByStatus } from "../../redux/Actions/orderAction";

function CancelledOrders() {
	const { Retailer } = useSelector((state) => state.retailerAuth);
	const { orders } = useSelector((state) => state.orderAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrderByStatus("Cancelled"));
	}, [dispatch]);

	return (
		<div className="retailer-orders-page">
			{/* Sidebar */}
			<RetailerSidebar retailer={Retailer} />

			{/* Main Content */}
			<div className="retailer-orders-content">
				<div className="top-bar">
					<h2>Cancelled Orders</h2>
				</div>

				<div className="orders-list">
					{orders?.length === 0 ? (
						<p>No cancelled orders available.</p>
					) : (
						orders &&
						[...orders] // Create a shallow copy of the orders array
            .reverse()?.map((order) => (
							<div className="order-item" key={order.id}>
								<h3>Order ID: {order?._id}</h3>
								<p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
								<p>Total Amount: ₹{order?.totalAmount.toFixed(2)}</p>
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

export default CancelledOrders;
