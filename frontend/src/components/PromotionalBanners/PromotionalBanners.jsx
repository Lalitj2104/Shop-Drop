import "./PromotionalBanners.css";
import WomenImage from "../../../public/Women's Style.jpg";
import handbag from "../../../public/handbag.jpg";
import watch from "../../../public/watch.jpg";
import backpack from "../../../public/backpack.jpg";

const PromotionalBanners = () => {
	return (
		<div className="promotional-banners">
			{/* Large Banner */}
			<div className="banner large-banner">
				<div className="banner-content">
					<h3 className="banner-subtitle">New Arrivals</h3>
					<h2 className="banner-title">Women&apos;s Style</h2>
					<p className="banner-description">Up to 70% Off</p>
					<button className="btn-primary">Shop Now</button>
				</div>
				<img src={WomenImage} alt="Women's Style" />
			</div>

			{/* Small Banners */}
			<div className="small-banners">
				<div className="banner small-banner">
					<div className="banner-content">
						<span className="discount-badge">25% Off</span>
						<h3 className="banner-title">Handbag</h3>
						<button className="btn-primary">Shop Now</button>
					</div>
					<img src={handbag} alt="Handbag" />
				</div>
				<div className="banner small-banner">
					<div className="banner-content">
						<span className="discount-badge">45% Off</span>
						<h3 className="banner-title">Watch</h3>
						<button className="btn-primary">Shop Now</button>
					</div>
					<img src={watch} alt="Watch" />
				</div>
			</div>

			{/* Second Large Banner */}
			<div className="banner second-large-banner">
				<div className="banner-content">
					<h3 className="banner-subtitle">Accessories</h3>
					<h2 className="banner-title">Backpack</h2>
					<p className="banner-description">Min. 40–80% Off</p>
					<button className="btn-primary">Shop Now</button>
				</div>
				<img src={backpack} alt="Backpack" />
			</div>
		</div>
	);
};

export default PromotionalBanners;
