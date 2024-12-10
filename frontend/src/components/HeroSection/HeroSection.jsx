import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import bannerImg from "../../../public/banner.jpg";

const HeroSection = () => {
	const navigate = useNavigate();

	// Access user authentication state from Redux
	const { isAuthenticated } = useSelector((state) => state.userAuth);

	const handleShopNowClick = () => {
		if (isAuthenticated) {
			navigate("/shop"); // Redirect to shop page if authenticated
		} else {
			navigate("/login"); // Redirect to login page if not authenticated
		}
	};

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
					<button className="btn btn-primary" onClick={handleShopNowClick}>
						Shop Now
					</button>
					<button className="btn btn-secondary">Read More</button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
