import "../../styles/RetailerDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getRetailerProducts,
	loadRetailer,
	logoutRetailer,
} from "../../redux/Actions/retailerActions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";
import { removeProduct } from "../../redux/Actions/productAction";
import RetailerSidebar from "../../components/RetailerSidebar/RetailerSidebar";

function RetailerDashboard() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { Retailer, message, error, products } = useSelector(
		(state) => state.retailerAuth
	);
	const { message: productmsg } = useSelector((state) => state.productAuth);

	useEffect(() => {
		dispatch(getRetailerProducts());
	}, []);

	// Handle logout
	const handleLogout = () => {
		dispatch(logoutRetailer());
	};

	useEffect(() => {
		if(productmsg) {
			toast.success(productmsg, toastOptions);
		}
		dispatch({
			type: "CLEAR_MESSAGE",
		});
		dispatch(getRetailerProducts());
	}, [productmsg]);

	useEffect(() => {
		if (message) {
			if (message == "Products fetched successfully") {
				return;
			}
			if (message == "Logout successful") {
				dispatch(loadRetailer());
			}
			toast.success(message, toastOptions);
			dispatch({
				type: "CLEAR_MESSAGE",
			});
		}
		if (error) {
			console.log(error);
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [message, error, products]);

	return (
		<div className="retailer-dashboard-app">
			{/* Sidebar */}
			<RetailerSidebar retailer={Retailer} />

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
						products?.map((product) => (
							<div className="retailer-dashboard-product" key={product.id}>
								<img
									src={product?.image?.url || "/placeholder.jpg"}
									alt={product.name}
								/>
								<h3>{product.name}</h3>
								<p>₹{product.price.toFixed(2)}</p>
								<div className="retailer-dashboard-product-buttons">
									<div>
										<Link to={`/updateProduct/${product?._id}`}>
											<button className="update-product-btn">
												Update Product
											</button>
										</Link>
									</div>
									<div>
										<button
											className="delete-product-btn"
											onClick={() => {
												dispatch(removeProduct(product?._id));
											}}
										>
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
