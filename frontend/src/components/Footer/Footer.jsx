
import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-column">
					<h3>About Us</h3>
					<p>
						Shop and Drop is your go-to store for the latest trends in fashion,
						accessories, and more. Experience quality and style at affordable
						prices.
					</p>
				</div>
				<div className="footer-column">
					<h3>Quick Links</h3>
					<ul>
						<li>
							<a href="#home">Home</a>
						</li>
						<li>
							<a href="#shop">Shop</a>
						</li>
						<li>
							<a href="#blog">Blog</a>
						</li>
						<li>
							<a href="#contact">Contact Us</a>
						</li>
					</ul>
				</div>
				<div className="footer-column">
					<h3>Contact Us</h3>
					<p>📞 (+01) 4587 880</p>
					<p>📧 support@pressmart.com</p>
					<p>🏠 123 Main Street, NY, USA</p>
				</div>
				<div className="footer-column">
					<h3>Follow Us</h3>
					<div className="social-icons">
						<a href="#facebook" aria-label="Facebook">
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="#twitter" aria-label="Twitter">
							<i className="fab fa-twitter"></i>
						</a>
						<a href="#instagram" aria-label="Instagram">
							<i className="fab fa-instagram"></i>
						</a>
						<a href="#linkedin" aria-label="LinkedIn">
							<i className="fab fa-linkedin-in"></i>
						</a>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<p>&copy; 2024 Shop-Drop. All Rights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
