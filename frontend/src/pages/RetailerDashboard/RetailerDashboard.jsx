import "./RetailerDashboard.css";
import profile from "../../../public/profile.jpg";
import flaredSweater from "../../../public/Flared Sleeves Sweater.jpg";
import Sweater from "../../../public/V-Neck Sweater.jpg";

function RetailerDashboard() {
	return (
		<div className="app">
			{/* Sidebar */}
			<div className="sidebar">
				<div className="profile">
					<img src={profile} alt="Profile" className="profile-img" />
					<h3>Diana Majkowska</h3>
					<p>Warsaw, Poland</p>
				</div>
				<ul className="menu">
					<li>
						My Wishes <span className="badge">12</span>
					</li>
					<li>
						My Messages <span className="badge">+3</span>
					</li>
					<li>
						Completed Orders <span className="badge">55</span>
					</li>
				</ul>
				<ul className="categories">
					<li>T-Shirts & Tops</li>
					<li>Activewear</li>
					<li>Sweaters</li>
					<li>Skirts & Shorts</li>
					<li>Outwear & Blazers</li>
					<li>Accessories & Shoes</li>
				</ul>
			</div>

			{/* Main Content */}
			<div className="dashboard-content">
				<h2>Products</h2>
				<div className="product-grid">
					<div className="product">
						<img src={flaredSweater} alt="Flared Sleeves Sweater" />
						<h3>Flared Sleeves Sweater</h3>
						<p>£19.99</p>
						<button>Update Product</button>
					</div>
					<div className="product">
						<img src={Sweater} alt="V-Neck Sweater" />
						<h3>V-Neck Sweater</h3>
						<p>£35.99</p>
						<button>Update Product</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RetailerDashboard;
