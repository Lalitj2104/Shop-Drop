import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";
import { Link } from "react-router-dom";
import "../../styles/RetailerOrder.css"
import RetailerSidebar from "../../components/RetailerSidebar/RetailerSidebar";
import { getOrderByRetailer } from "../../redux/Actions/orderAction";

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
	const{Retailer} = useSelector((state) => state.retailerAuth);
	const {rorder} = useSelector((state) => state.orderAuth);
	const dispatch=useDispatch();
	// Fetch orders on component mount
	
	useEffect(() => {
		dispatch(getOrderByRetailer());
	}, [dispatch]);
	
	// Handle errors or success messages
	useEffect(() => {
		// if (message) {
		// 	toast.success(message, toastOptions);
		// }
		// if (error) {
		// 	toast.error(error, toastOptions);
		// }
	}, []);
	console.log(rorder?.length);
	return (
		<div className="retailer-orders-page">
			{/* Sidebar */}
			<RetailerSidebar  Retailer={Retailer}/>

			{/* Main Content */}
			<div className="retailer-orders-content">
				<div className="top-bar">
					<h2>My Orders</h2>
				</div>

				<div className="orders-list">
					{rorder &&rorder?.length === 0 ? (
						<p>No orders available.</p>
					) : (
						rorder &&rorder?.map((item) => (
							<div className="order-item" key={item?._id}>
								<h3>Order ID: {item?._id}</h3>
								<p>Date: {new Date(item?.createdAt).toLocaleDateString()}</p>
								<p>Total Amount: ₹{item?.totalAmount.toFixed(2)}</p>
								<p>Status: {item?.status}</p>
								<div className="order-buttons">
									<Link to={`/orderDetails/${item?._id}`}>
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
