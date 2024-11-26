import { useState } from "react";
import "./FeaturedProducts.css";
import backpack from "../../../public/Tan Solid Laptop Backpack.jpg";
import jacket from "../../../public/Brown Solid Biker Jacket.jpg";
import top from "../../../public/Petite Olive Green Solid Top.jpg";
import boots from "../../../public/Men Brown Solid Mid-Top Boots.jpg";
import handbag from "../../../public/Brown Self Design Shoulder Handbag.jpg";
import watch from "../../../public/Black Analogue and Digital Watch.jpg";

const tabs = ["New Arrival", "Best Selling", "Top Rated"];

const products = {
	"New Arrival": [
		{
			id: 1,
			name: "Tan Solid Laptop Backpack",
			price: "$149.00 - $185.00",
			image: backpack, 
			rating: 4.5,
		},
		{
			id: 2,
			name: "Brown Solid Biker Jacket",
			price: "$110.00 - $120.00",
			image: jacket, 
			rating: 4.7,
		},
	],
	"Best Selling": [
		{
			id: 3,
			name: "Petite Olive Green Solid Top",
			price: "$49.00",
			image: top, 
			rating: 4.3,
		},
		{
			id: 4,
			name: "Men Brown Solid Mid-Top Boots",
			price: "$115.00",
			image: boots, 
			rating: 4.8,
		},
	],
	"Top Rated": [
		{
			id: 5,
			name: "Brown Self Design Shoulder Handbag",
			price: "$78.00",
			image: handbag, 
			rating: 4.9,
		},
		{
			id: 6,
			name: "Black Analogue and Digital Watch",
			price: "$1,599.00",
			image: watch, 
			rating: 4.7,
		},
	],
};

const FeaturedProducts = () => {
	const [activeTab, setActiveTab] = useState(tabs[0]);

	return (
		<section className="featured-products">
			<h2 className="section-title">Featured Products</h2>
			<div className="tabs">
				{tabs.map((tab) => (
					<button
						key={tab}
						className={`tab-button ${activeTab === tab ? "active" : ""}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>
			<div className="products-grid">
				{products[activeTab].map((product) => (
					<div key={product.id} className="product-card">
						<img src={product.image} alt={product.name} />
						<h4 className="product-name">{product.name}</h4>
						<p className="product-price">{product.price}</p>
						<p className="product-rating">⭐ {product.rating}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturedProducts;
