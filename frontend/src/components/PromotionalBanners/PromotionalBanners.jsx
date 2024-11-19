
import "./PromotionalBanners.css";

const PromotionalBanners = () => {
	return (
		<div className="promotional-banners">
			<div className="banner large-banner">
				<div className="banner-content">
					<h3>New Arrivals</h3>
					<h2>Women&apos;s Style</h2>
					<p>Up to 70% Off</p>
					<a href="#shop" className="btn">
						Shop Now
					</a>
				</div>
				<img
					src="https://via.placeholder.com/500x300" 
					alt="Women's Style"
				/>
			</div>
			<div className="small-banners">
				<div className="banner small-banner">
					<div className="banner-content">
						<span className="discount-badge">25% Off</span>
						<h3>Handbag</h3>
						<a href="#shop" className="btn">
							Shop Now
						</a>
					</div>
					<img
						src="https://via.placeholder.com/250x150"
						alt="Handbag"
					/>
				</div>
				<div className="banner small-banner">
					<div className="banner-content">
						<span className="discount-badge">45% Off</span>
						<h3>Watch</h3>
						<a href="#shop" className="btn">
							Shop Now
						</a>
					</div>
					<img
						src="https://via.placeholder.com/250x150"
						alt="Watch"
					/>
				</div>
			</div>
			<div className="banner second-large-banner">
				<div className="banner-content">
					<h3>Accessories</h3>
					<h2>Backpack</h2>
					<p>Min. 40–80% Off</p>
					<a href="#shop" className="btn">
						Shop Now
					</a>
				</div>
				<img
					src="https://via.placeholder.com/500x300" 
					alt="Backpack"
				/>
			</div>
		</div>
	);
};

export default PromotionalBanners;
