import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import FeatureHighlights from "../../components/FeatureHighlights/FeatureHighlights";
import PromotionalBanners from "../../components/PromotionalBanners/PromotionalBanners";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import FeaturedCategories from "../../components/FeaturedCategories/FeaturedCategories";
import Footer from "../../components/Footer/Footer";

function Home() {
	return (
		<div>
			<Header />
			<HeroSection />
			<FeatureHighlights />
			<PromotionalBanners />
			<FeaturedProducts />
			<FeaturedCategories />
			<Footer />
		</div>
	);
}

export default Home;
