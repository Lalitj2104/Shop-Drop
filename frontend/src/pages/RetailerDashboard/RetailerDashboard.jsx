import { useDispatch, useSelector } from "react-redux";
import "../../styles/RetailerDashboard.css";

function RetailerDashboard() {

	return (
		<div className="retailer-dashboard">
			{/* Sidebar */}
			<div className="retailer-sidebar">
				<div className="retailer-profile">
					<div className="retailer-profile-img"></div>
					<h3>{retailerInfo.name}</h3>
					<p>{retailerInfo.location}</p>
				</div>
				<ul className="retailer-menu">
					<li>
						My Wishes <span className="badge">{retailerInfo.wishes || 0}</span>
					</li>
					<li>
						My Messages{" "}
						<span className="badge">+{retailerInfo.messages || 0}</span>
					</li>
					<li>
						Completed Orders{" "}
						<span className="badge">{retailerInfo.completedOrders || 0}</span>
					</li>
				</ul>
				<ul className="retailer-categories">
					{retailerInfo.categories?.map((category, index) => (
						<li key={index}>{category}</li>
					))}
				</ul>
			</div>

			{/* Main Content */}
			<div className="retailer-dashboard-content">
				<div className="products-header">
					<h2>Products</h2>
					<button className="add-product-btn" onClick={handleAddProduct}>
						Add Product
					</button>
				</div>
				<div className="retailer-product-grid">
					{products.map((product) => (
						<div className="retailer-product" key={product.id}>
							<img src={product.image} alt={product.name} />
							<h3>{product.name}</h3>
							<p>£{product.price.toFixed(2)}</p>
							<button>Update Product</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default RetailerDashboard;
