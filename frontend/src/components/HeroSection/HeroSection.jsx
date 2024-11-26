import "./HeroSection.css";
import bannerImg from "../../../public/banner.jpg";

const HeroSection = () => {
	return (
		<section className="hero-section">
			<div className="hero-image">
				<img src={bannerImg} alt="Men's Fashion" />
			</div>
			<div className="hero-content">
				<h4 className="hero-subtitle">Season Sale</h4>
				<h1 className="hero-title">MEN&apos;S FASHION</h1>
				<p className="hero-description">Min. 35-70% Off</p>
				<div className="hero-buttons">
					<button className="btn btn-primary">Shop Now</button>
					<button className="btn btn-secondary">Read More</button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
