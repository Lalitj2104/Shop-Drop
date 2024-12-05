// src/components/ProductList.jsx
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import staticProducts from "../../../data/staticProducts";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const useStaticData = true; // Set to `false` to fetch data from backend

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			if (useStaticData) {
				// Use static data
				setProducts(staticProducts);
				setLoading(false);
			} else {
				// Fetch from backend
				try {
					setLoading(true);
					const response = await fetch("https://example.com/api/products"); // Replace with actual backend URL
					const data = await response.json();
					setProducts(data);
				} catch (error) {
					console.error("Failed to fetch products:", error);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchProducts();
	}, []);

	return (
    <>
      <Header/>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					padding: "20px",
				}}
			>
				{loading ? (
					<p>Loading products...</p>
				) : (
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))
				)}
      </div>
      <Footer/>
		</>
	);
};

export default ProductList;
