import React from "react";
import "../../styles/Wishlist.css"; // Updated styles for horizontal cards
import Header from "../../components/Header/Header";

function Wishlist() {
	const WishlistProducts = [
		{
			id: 1,
			name: "Flared Sleeves Sweater",
			price: 19.99,
			image: "/Flared Sleeves Sweater.jpg",
			color: "Beige",
		},
		{
			id: 2,
			name: "V-Neck Sweater",
			price: 35.99,
			image: "/V-Neck Sweater.jpg",
			color: "Light Blue",
		},
		{
			id: 3,
			name: "Casual Knitwear",
			price: 25.99,
			image: "/Casual Knitwear.jpg",
			color: "Gray",
		},
	];

	return (
		<>
			<Header />
			<div className="wishlist-container">
				<h2 className="wishlist-title">Your Wishlist</h2>
				<p className="wishlist-subtitle">Keep track of items you love</p>

				<div className="wishlist-list">
					{WishlistProducts.map((product) => (
						<div className="wishlist-horizontal-card" key={product.id}>
							{/* Product Image */}
							<div className="wishlist-image-wrapper">
								<img
									src={product.image}
									alt={product.name}
									className="wishlist-image"
								/>
							</div>

							{/* Product Details */}
							<div className="wishlist-details">
								<h3 className="wishlist-name">{product.name}</h3>
								<p className="wishlist-color">Color: {product.color}</p>
								<p className="wishlist-price">$ {product.price.toFixed(2)}</p>
							</div>

							{/* Action Buttons */}
							<div className="wishlist-actions">
								<button className="wishlist-add-to-cart">Add to Bag</button>
								<button className="wishlist-remove">🗑</button>
							</div>
						</div>
					))}
				</div>

				{/* Add All Button */}
				<div className="wishlist-add-all">
					<button>Add All to Bag</button>
				</div>
			</div>
		</>
	);
}

export default Wishlist;
