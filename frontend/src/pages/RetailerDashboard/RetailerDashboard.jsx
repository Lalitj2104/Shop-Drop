import "../../styles/RetailerDashboard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	loadRetailer,
	logoutRetailer,
} from "../../redux/Actions/retailerActions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";
import { getAllProducts } from "../../redux/Actions/productAction";

function RetailerDashboard() {
	// Mocked user data

	const dispatch = useDispatch();
	const { Retailer, message, error } = useSelector(
		(state) => state.retailerAuth
	);
	const { products } = useSelector((state) => state.productAuth);

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

	useEffect(()=>{
		dispatch(getAllProducts());
	},[products])

	// Handle logout
	const handleLogout = () => {
		dispatch(logoutRetailer());
	};

	useEffect(() => {
		if (message) {
			console.log(message);
			toast.success(message, toastOptions);
			dispatch({
				type: "CLEAR_MESSAGE",
			});
			
			console.log(products);
			if (message == "Logout successful") {
				dispatch(loadRetailer());
			}
		}
		if (error) {
			console.log(error);
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [ message, error,products]);

	return (
		<div className="retailer-dashboard-app">
			{/* Sidebar */}
			<div className="retailer-dashboard-sidebar">
				<div className="retailer-dashboard-profile">
					<h3>{Retailer?.firstName} {Retailer?.middleName} {Retailer?.lastName}</h3>
					<p>{Retailer?.location}</p>
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
					{products?.length === 0 ? (
						<p>No products available.</p>
					) : (
						products &&products?.map((product) => (
							<div className="retailer-dashboard-product" key={product.id}>
								<img
									src={product.image || "/placeholder.jpg"}
									alt={product.name}
								/>
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
										<button className="delete-product-btn">
											Delete Product
										</button>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default RetailerDashboard;
