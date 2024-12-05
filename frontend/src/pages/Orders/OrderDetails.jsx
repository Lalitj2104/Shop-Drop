import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/OrderDetails.css";
import staticOrders from "../../data/staticOrders";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const OrderDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const order = staticOrders.find((o) => o.orderNo === id);

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
							<strong>Ordered On:</strong> {order.orderedOn}
						</p>
						<p>
							<strong>Delivering To:</strong> {order.deliveringTo}
						</p>
						<p>
							<strong>Estimated Delivery:</strong> {order.estimatedDelivery}
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
							{order.items.map((item, index) => (
								<li key={index}>
									<strong>{item.name}</strong> - Qty: {item.quantity} - ₹
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
