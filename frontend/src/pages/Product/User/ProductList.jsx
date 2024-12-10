import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/Actions/productAction";
import Loading from "../../../components/Loading/LoadingPage";
import "../../../styles/ProductList.css"

const ProductList = () => {
	const dispatch = useDispatch();
	const { loading, products } = useSelector((state) => state.productAuth);

	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000); // Adjust max price based on your product range
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	// Update filtered products whenever the price range or products change
	useEffect(() => {
		if (products) {
			setFilteredProducts(
				products.filter(
					(product) => product.price >= minPrice && product.price <= maxPrice
				)
			);
		}
	}, [minPrice, maxPrice, products]);

	// Function to clear filter and show all products
	const clearFilter = () => {
		setMinPrice(0);
		setMaxPrice(20000); // Adjust this to the initial range
		setFilteredProducts(products); // Reset filtered products
	};

	return (
		<>
			<Header />
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					padding: "20px",
				}}
			>
				<div
					className="sidebar"
					style={{
						width: "250px",
						padding: "20px",
						backgroundColor: "#f9f9f9",
						borderRadius: "8px",
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
					}}
				>
					<h3>Filter by Price</h3>
					<div style={{ marginBottom: "15px" }}>
						<label>
							Min Price:
							<input
								type="number"
								value={minPrice}
								onChange={(e) => setMinPrice(Number(e.target.value))}
								style={{
									marginLeft: "10px",
									padding: "5px",
									width: "80px",
									borderRadius: "4px",
								}}
							/>
						</label>
						<label>
							Max Price:
							<input
								type="number"
								value={maxPrice}
								onChange={(e) => setMaxPrice(Number(e.target.value))}
								style={{
									marginLeft: "10px",
									padding: "5px",
									width: "80px",
									borderRadius: "4px",
								}}
							/>
						</label>
					</div>

					<button
						onClick={clearFilter}
						style={{
							padding: "10px 20px",
							backgroundColor: "#e74c3c",
							color: "#fff",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
							width: "100%",
							marginTop: "10px",
						}}
					>
						Clear Filter
					</button>
				</div>

				<div
					className="product-list"
					style={{
						flexGrow: 1,
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
					}}
				>
					{loading ? (
						<Loading />
					) : (
						filteredProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ProductList;
