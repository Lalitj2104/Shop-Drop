import "../../styles/RetailerDashboard.css";
import profileImg from "../../../public/profile.jpg";

function RetailerDashboard() {
	// Mocked user data
	const userInfo = {
		name: "Khushi Agarwal",
		location: "Warsaw, Poland",
		wishes: 12,
		messages: 3,
		completedOrders: 55,
		categories: [
			"T-Shirts & Tops",
			"Activewear",
			"Sweaters",
			"Skirts & Shorts",
			"Outwear & Blazers",
			"Accessories & Shoes",
		],
	};

	// Mocked product data
	const products = [
		{
			id: 1,
			name: "Flared Sleeves Sweater",
			price: 19.99,
			image: "../../../public/Flared Sleeves Sweater.jpg",
		},
		{
			id: 2,
			name: "V-Neck Sweater",
			price: 35.99,
			image: "../../../public/V-Neck Sweater.jpg",
		},
		{
			id: 3,
			name: "V-Neck Sweater",
			price: 35.99,
			image: "../../../public/V-Neck Sweater.jpg",
		},
		{
			id: 4,
			name: "V-Neck Sweater",
			price: 35.99,
			image: "../../../public/V-Neck Sweater.jpg",
		},
		{
			id: 5,
			name: "V-Neck Sweater",
			price: 35.99,
			image: "../../../public/V-Neck Sweater.jpg",
		},
		{
			id: 6,
			name: "V-Neck Sweater",
			price: 35.99,
			image: "../../../public/V-Neck Sweater.jpg",
		},
	];

	return (
		<div className="retailer-dashboard-app">
			{/* Sidebar */}
			<div className="retailer-dashboard-sidebar">
				<div className="retailer-dashboard-profile">
					<img
						src={profileImg}
						alt="Profile"
						className="retailer-dashboard-profile-img"
					/>
					<h3>{userInfo.name}</h3>
					<p>{userInfo.location}</p>
				</div>
				<ul className="retailer-dashboard-menu">
					<li>
						My Wishes{" "}
						<span className="retailer-dashboard-badge">{userInfo.wishes}</span>
					</li>
					<li>
						My Messages{" "}
						<span className="retailer-dashboard-badge">
							+{userInfo.messages}
						</span>
					</li>
					<li>
						Completed Orders{" "}
						<span className="retailer-dashboard-badge">
							{userInfo.completedOrders}
						</span>
					</li>
				</ul>
				<ul className="retailer-dashboard-categories">
					{userInfo.categories.map((category, index) => (
						<li key={index}>{category}</li>
					))}
				</ul>
			</div>

			{/* Main Content */}
			<div className="retailer-dashboard-content">
				<h2>Products</h2>
				<div className="retailer-dashboard-product-grid">
					{products.map((product) => (
						<div className="retailer-dashboard-product" key={product.id}>
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
