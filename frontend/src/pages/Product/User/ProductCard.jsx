// components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/ProductCard.css";

const ProductCard = ({ product }) => {
	return (
		<div className="product-card">
			<div className="product-image">
				<img
					src={product.image}
					alt={product.name}
					className="product-image-content"
				/>
			</div>
			<div className="product-details">
				<h3 className="product-name">{product.name}</h3>
				<p className="product-price">${product.price.toFixed(2)}</p>
				<Link to={`/product/${product.id}`}>
					<button className="more-details-button">More Details</button>
				</Link>
			</div>
		</div>
	);
};

export default ProductCard;
