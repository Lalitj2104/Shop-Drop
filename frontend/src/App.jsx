import FeaturedCategories from "./components/FeaturedCategories/FeaturedCategories"
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts"
import FeatureHighlights from "./components/FeatureHighlights/FeatureHighlights"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import HeroSection from "./components/HeroSection/HeroSection"
import PromotionalBanners from "./components/PromotionalBanners/PromotionalBanners"

function App() {
  return (
    <>
        <div>
            <Header/>
            <HeroSection/>
            <FeatureHighlights/>
            <PromotionalBanners/>
            <FeaturedProducts/>
            <FeaturedCategories/>
            <Footer/>
        </div>
    </>
  )
}

export default App