
import "./FeatureHighlights.css";

const features = [
	{
		icon: "🚚",
		title: "Free Shipping",
		description: "On all orders over $50",
	},
	{
		icon: "🔒",
		title: "Secure Payment",
		description: "We ensure secure payment",
	},
	{
		icon: "💰",
		title: "100% Money Back",
		description: "30 Days return policy",
	},
	{
		icon: "📞",
		title: "Online Support",
		description: "24/7 dedicated support",
	},
];

const FeatureHighlights = () => {
	return (
		<section className="feature-highlights">
			{features.map((feature, index) => (
				<div key={index} className="feature-item">
					<div className="feature-icon">{feature.icon}</div>
					<div className="feature-content">
						<h4 className="feature-title">{feature.title}</h4>
						<p className="feature-description">{feature.description}</p>
					</div>
				</div>
			))}
		</section>
	);
};

export default FeatureHighlights;
