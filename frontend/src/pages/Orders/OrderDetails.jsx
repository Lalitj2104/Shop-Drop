import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/OrderDetails.css";
import staticOrders from "../../data/staticOrders";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";

const OrderDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	// const order = staticOrders.find((o) => o.orderNo === id);
	const dispatch=useDispatch();
	const {order}=useSelector(state=>state.orderAuth);

	useEffect(()=>{
		dispatch(getOrderById(id));
		console.log(order);
	},[])

	const [activeTab, setActiveTab] = useState("details");

	if (!order) return <p>Order not found</p>;

	return (
    <>
      <Header/>
			<div className="order-details">
				<button className="back-button" onClick={() => navigate("/orders")}>
					Back to Orders
				</button>
				<div className="tabs">
					<button
						className={`tab ${activeTab === "details" ? "active" : ""}`}
						onClick={() => setActiveTab("details")}
					>
						Details
					</button>
					<button
						className={`tab ${activeTab === "items" ? "active" : ""}`}
						onClick={() => setActiveTab("items")}
					>
						Items
					</button>
				</div>

				{activeTab === "details" && (
					<div className="details-tab">
						<p>
							<strong>Ordered On:</strong> {new Date(order?.createdAt).toISOString().split("T")[0]}
						</p>
						<p>
							<strong>Delivering To:</strong> {order?.shippingAddress}
						</p>
						<p>
							<strong>Estimated Delivery:</strong> {new Date(order?.createdAt+5).toISOString().split("T")[0]}
						</p>
						<p>
							<strong>Order Summary:</strong> {order.summary}
						</p>
						<button className="download-invoice">Download Invoice</button>
					</div>
				)}

				{activeTab === "items" && (
					<div className="items-tab">
						<ul>
							{order.products.map((item, index) => (
								<li key={index}>
									<strong>{item?.name}</strong> - Qty: {item?.quantity} - ₹
									{item.price}
								</li>
							))}
						</ul>
					</div>
				)}
      </div>
      <Footer/>
		</>
	);
};

export default OrderDetails;
