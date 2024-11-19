
import "./FeaturedCategories.css";

const categories = [
	{
		id: 1,
		title: "Men's Fashion",
		discount: "Flat 70% Off",
		image: "",
		buttonText: "Shop Now",
	},
	{
		id: 2,
		title: "Women's Wear",
		discount: "Min. 35-70% Off",
		image: "",
		buttonText: "Shop Now",
	},
];

const FeaturedCategories = () => {
	return (
		<section className="featured-categories">
			<div className="categories-container">
				{categories.map((category) => (
					<div key={category.id} className="category-card">
						<img src={category.image} alt={category.title} />
						<div className="category-details">
							<h3 className="category-title">{category.title}</h3>
							<p className="category-discount">{category.discount}</p>
							<button className="category-button">{category.buttonText}</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturedCategories;
