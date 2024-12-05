import "../../styles/RetailerDashboard.css";
import profileImg from "../../../public/profile.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadRetailer, logoutRetailer } from "../../redux/Actions/retailerActions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

function RetailerDashboard() {
	// Mocked user data

	const dispatch = useDispatch();
	const {message,error}=useSelector(state=>state.retailerAuth)

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
		{
			id: 7,
			name: "V-Neck Sweater",
			price: 35.99,
			image: "../../../public/V-Neck Sweater.jpg",
		},
		// Add more products here
	];

	// Handle logout
	const handleLogout = () => {
		dispatch(logoutRetailer());

	};
	useEffect(()=>{
		if (message) {
			console.log(message);
			toast.success(message, toastOptions);
			dispatch({
				type: "CLEAR_MESSAGE",
			});
			if (message == "Logout successful") {
				dispatch(loadRetailer());
			}
		}
		if (error) {
			console.log(error);
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, message, error,]);



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
						My Orders{" "}
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
				{/* Logout Button */}
				<button onClick={handleLogout} className="logout-btn">
					Logout
				</button>
			</div>

			{/* Main Content */}
			<div className="retailer-dashboard-content">
				<div className="top-bar">
					<h2>Products</h2>

					{/* Add Product Button */}
					<Link to="/addProduct">
						<button className="add-product-btn">Add Product</button>
					</Link>
				</div>

				<div className="retailer-dashboard-product-grid">
					{products.map((product) => (
						<div className="retailer-dashboard-product" key={product.id}>
							<img src={product.image} alt={product.name} />
							<h3>{product.name}</h3>
							<p>₹{product.price.toFixed(2)}</p>
							<div className="retailer-dashboard-product-buttons">
								<div>
									<Link to={"/updateProduct"}>
										<button className="update-product-btn">
											Update Product
										</button>
									</Link>
								</div>
								<div>
									<button className="delete-product-btn">Delete Product</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default RetailerDashboard;
