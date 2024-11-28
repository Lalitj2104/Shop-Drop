
import Header from "../../components/Header/Header";
import "../../styles/Orders.css";

const Order = () => {
    return (
        <>
            <Header/>
		<div className="your-orders-container">
			{/* Header */}
			<h1 className="your-orders-header">Your Orders</h1>

			{/* Navigation */}
			<div className="your-orders-navigation">
				<span className="active-tab">Orders</span>
				<span>Buy Again</span>
				<span>Not Yet Shipped</span>
				<span>Cancelled Orders</span>
			</div>

			{/* Order Selector */}
			<div className="order-selector">
				<span>
					0 orders placed in{" "}
					<select>
						<option value="3 months">past 3 months</option>
						<option value="6 months">past 6 months</option>
						<option value="2024">2024</option>
					</select>
				</span>
				<div className="search-orders">
					<input type="text" placeholder="Search all orders" />
					<button>Search Orders</button>
				</div>
			</div>

			{/* Empty Order Message */}
			<div className="empty-order-message">
				<p>Looks like you haven&apos;t placed an order in the last 3 months.</p>
				<p>
					<a href="/orders/2024">View orders in 2024</a>
				</p>
			</div>
		</div>
        </>
	);
};

export default Order;
