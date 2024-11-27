import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // For Redux state
import "./Header.css"; // Import the CSS styles

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();

  // Redux state for user authentication
  const { isAuthenticated, user } = useSelector((state) => state.auth || {}); // Fallback to empty object

  // Functions to handle hover events
  const showDropdown = () => setDropdownVisible(true);
  const hideDropdown = () => setDropdownVisible(false);

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
            <span>🌍 English</span> | <span>$ Dollar (USD)</span>
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        {/* Logo */}
        <div className="logo">Shop & Drop</div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Pages</a>
          <a href="#">Blog</a>
          <a href="#">Elements</a>
          <a href="#">Buy</a>
        </nav>

        {/* Navigation Icons */}
        <div className="nav-icons">
          {/* Delivery Info: Only visible when logged in */}
          {isAuthenticated && (
            <div className="delivery-info">
              <p>
                Deliver to <strong>{user?.name || "Guest"}</strong>
                <br />
                <span>{user?.address || "Set your delivery location"}</span>
              </p>
            </div>
          )}
          {/* Search, Wishlist, Cart */}
          <button className="icon">🔍</button>
          <button className="icon">❤️</button>
          <button className="icon">🛒</button>

          {/* User Icon with Dropdown */}
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
