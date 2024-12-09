import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";
import { Link } from "react-router-dom";
import "../../styles/RetailerOrder.css";
import RetailerSidebar from "../../components/RetailerSidebar/RetailerSidebar";
import { getOrderByStatus } from "../../redux/Actions/orderAction";

// Static completed orders data
// const staticCompletedOrdersData = [
// 	{
// 		id: "ORD002",
// 		date: "2024-12-03",
// 		totalAmount: 1499.99,
// 		status: "Completed",
// 	},
// 	{
// 		id: "ORD004",
// 		date: "2024-11-28",
// 		totalAmount: 1999.99,
// 		status: "Completed",
// 	},
// ];

function CompletedOrders() {
	const { Retailer } = useSelector((state) => state.retailerAuth);

	const {message,error,orders}=useSelector(state => state.orderAuth);
	const dispatch=useDispatch();
	useEffect(()=>{
		dispatch(getOrderByStatus("Delivered"));
	},[dispatch]);

	// Handle errors or success messages
	useEffect(() => {
		if (message) {
			dispatch({type:"CLEAR_MESSAGE"})
		}
		if (error) {
			dispatch({type:"CLEAR_ERROR"})
		}
	}, [dispatch]);

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
					{orders.length === 0 ? (
						<p>No completed orders available.</p>
					) : (
						orders&&orders?.map((order) => (
							<div className="order-item" key={order?._id}>
								<h3>Order ID: {order?._id}</h3>
								<p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
								<p>Total Amount: ₹{order?.totalAmount.toFixed(2)}</p>
								<p>Status: {order?.status}</p>
								<div className="order-buttons">
									<Link to={`/orderDetails/${order?._id}`}>
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
