import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS styles

const Header = () => {
	return (
		<header className="header">
			<div className="header-top">
				<div className="contact-info">
					<p>📞 (+01) 4587 880 | ✉️ support@pressmart.com</p>
				</div>
				<div className="top-right">
					<p>Welcome to Our Store!</p>
					<p>
						<span>🌍 English</span> | <span>$ Dollar (USD)</span>
					</p>
				</div>
			</div>
			<div className="header-main">
				<div className="logo">Shop & Drop</div>
				<nav className="nav-menu">
					<a href="#">Home</a>
					<a href="#">Shop</a>
					<a href="#">Pages</a>
					<a href="#">Blog</a>
					<a href="#">Elements</a>
					<a href="#">Buy</a>
				</nav>
				<div className="nav-icons">
					<button className="icon">🔍</button>
					<button className="icon">❤️</button>
					<button className="icon">🛒</button>
					<Link to="/login">
						<button className="icon">👤</button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
