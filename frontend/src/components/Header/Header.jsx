import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { loadUser, logoutUser } from "../../redux/Actions/userActions";
import { IoMdAdd } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

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
		setTimeout(() => {
			dispatch(loadUser());
		}, 0);
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
						🌍 <span>English</span> | ₹ <span>Rupee(IND)</span>
					</p>
				</div>
			</div>

			{/* Main Header */}
			<div className="header-main">
				<div className="logo">Shop & Drop</div>

				{isAuthenticated && (
					<div className="delivery-info">
						{/* Delivery Dropdown */}
						{/* <div className="delivery-option">
							<select
								value={deliveryMode}
								onChange={(e) => setDeliveryMode(e.target.value)}
							>
								<option value="Delivery">Delivery</option>
								<option value="Instore">Instore</option>
							</select>
						</div> */}
						{/* User Info */}
						<p>
							Welcome <strong>{name}</strong>
							<br />
							<span>
								{(address && address[0]?.city) || "Set your delivery location"}
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
					<Link to="/Categories">Categories</Link>
					<Link to="/blog">Blog</Link>
					{ isAuthenticated?<Link to="http://localhost:3000">Gaming zone</Link>:
					<Link to="/login"/>}
					{/* <Link to="/buy">Buy</Link> */}
				</nav>

				<div className="nav-icons">
					{isAuthenticated && (
					<button className="icon" onClick={() => navigate("/chatbot")}>
						<IoChatbubbleEllipsesOutline />
					</button>
					)}
					<button className="icon" onClick={() => navigate("/wishlist")}>❤️</button>
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
