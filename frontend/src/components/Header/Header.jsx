import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { loadUser, logoutUser } from "../../redux/Actions/userActions";
import { IoMdAdd } from "react-icons/io";

const Header = () => {
	const [isDropdownVisible, setDropdownVisible] = useState(false);
	const [deliveryMode, setDeliveryMode] = useState("Delivery"); // New dropdown state

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, user, message, error, id } = useSelector(
		(state) => state.userAuth
	);

	const showDropdown = () => setDropdownVisible(true);
	const hideDropdown = () => setDropdownVisible(false);

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	let name = user?.firstName || id?.firstName;
	let address = user?.address || [];

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
						{/* Delivery Dropdown */}
						<div className="delivery-option">
							<select
								value={deliveryMode}
								onChange={(e) => setDeliveryMode(e.target.value)}
							>
								<option value="Delivery">Delivery</option>
								<option value="Instore">Instore</option>
							</select>
						</div>
						{/* User Info */}
						<p>
							Welcome <strong>{name}</strong>
							<br />
							<span>
								{address[0]?.city || "Set your delivery location"}
							</span>{" "}
							<span>
								<Link to="/AddAddress">
									<IoMdAdd />
								</Link>
							</span>
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
					<button className="icon" onClick={() => navigate("/cart")}>
						🛒
					</button>

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
										<button onClick={logoutHandler}>Logout</button>
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
