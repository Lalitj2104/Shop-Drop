import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";

const Header = () => {
	const [isDropdownVisible, setDropdownVisible] = useState(false);

	const dispatch = useDispatch();
	const { isAuthenticated, user} = useSelector((state) => state.userAuth);

	const showDropdown = () => setDropdownVisible(true);
  const hideDropdown = () => setDropdownVisible(false);
  
  console.log(user);

	return (
		<header className="header">
			{/* Top Header */}
			<div className="header-top">
				<div className="contact-info">
					<p>📞 (+01) 4587 880 | ✉️ support@pressmart.com</p>
				</div>
				<div className="top-right">
					<p>Welcome to Our Store!</p>
					<p>
						🌍 <span>English</span> | $ <span>Dollar (USD)</span>
					</p>
				</div>
			</div>

			{/* Main Header */}
			<div className="header-main">
				<div className="logo">Shop & Drop</div>
				{isAuthenticated && (
					<div className="delivery-info">
						<p>
							Deliver to <strong>{firstName}</strong>
							<br />
							<span>{user?.address || "Set your delivery location"}</span>
						</p>
					</div>
				)}

				<nav className="nav-menu">
					<Link to="/">Home</Link>
					<Link to="/shop">Shop</Link>
					<Link to="/pages">Pages</Link>
					<Link to="/blog">Blog</Link>
					<Link to="/elements">Elements</Link>
					<Link to="/buy">Buy</Link>
				</nav>

				<div className="nav-icons">
					<button className="icon">🔍</button>
					<button className="icon">❤️</button>
					<button className="icon">🛒</button>

					<div
						className="user-icon-wrapper"
						onMouseEnter={showDropdown}
						onMouseLeave={hideDropdown}
					>
						<button className="icon">👤</button>
						{isDropdownVisible && (
							<div className="dropdown">
								{isAuthenticated ? (
									<>
										<Link to="/account">Your Account</Link>
										<Link to="/orders">Your Orders</Link>
										<button onClick={() => dispatch({ type: "LOGOUT" })}>
											Logout
										</button>
									</>
								) : (
									<>
										<Link to="/login">Login</Link>
										<Link to="/register">Signup</Link>
									</>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
