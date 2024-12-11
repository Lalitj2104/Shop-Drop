import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/ProductCard.css";
import { addToCart } from "../../../redux/Actions/cartAction"; // Import addToCart action
import { toast } from "react-toastify";
import toastOptions from "../../../constants/toast";

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();

	const { message, error } = useSelector((state) => state.cartAuth);

	// Handle Add to Cart
	const handleAddToCart = () => {
		dispatch(addToCart(product?._id, 1)); // Add 1 quantity by default
	};

	

	return (
		<div className="product-card">
			<div className="product-image">
				<img
					src={product?.image?.url}
					alt={product?.name}
					className="product-image-content"
				/>
			</div>
			<div className="product-details">
				<h3 className="product-name">{product?.name}</h3>
				<p className="product-description">{product?.description}</p>
				<p className="product-price">₹{product?.price.toFixed(2)}</p>

				<Link to={`/product/${product?._id}`}>
					<button className="more-details-button">More Details</button>
				</Link>

				<button className="add-to-cart-button" onClick={handleAddToCart}>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
