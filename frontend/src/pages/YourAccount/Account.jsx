import { useNavigate } from "react-router-dom";
import "../../styles/Account.css";
import lock from "../../assets/lock.png";
import contact from "../../assets/contact.png";
import creditcard from "../../assets/creditcard.png";
import locationfinal from "../../assets/locationfinal.png";
import orderimg from "../../assets/orderimg.jpg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import YourAccountBanner from "../../components/YourAccountBanner/YourAccountBanner";

const Account = () => {
	const navigate = useNavigate();

	return (
		<>
			<Header />
			<div className="account-container">
				<h2>Your Account</h2>
				<div className="grid-container">
					<div className="grid-item" onClick={() => navigate("/orders")}>
						<img src={orderimg} alt="Your Orders" />
						<h3>Your Orders</h3>
						<p>Track, return, or buy things again</p>
					</div>
					<div className="grid-item" onClick={() => navigate("/LoginSecurity")}>
						<img src={lock} alt="Login & Security" />
						<h3>Login & security</h3>
						<p>Edit login, name, and mobile number</p>
					</div>
					<div className="grid-item" onClick={() => navigate("/yourAddress")}>
						<img src={locationfinal} alt="Your Addresses" />
						<h3>Your Addresses</h3>
						<p>Edit addresses for orders and gifts</p>
					</div>
					<div
						className="grid-item"
						onClick={() => navigate("/PaymentOptions")}
					>
						<img src={creditcard} alt="Payment Options" />
						<h3>Payment options</h3>
						<p>Edit or add payment methods</p>
					</div>
					<div className="grid-item" onClick={() => navigate("/ContactUs")}>
						<img src={contact} alt="Contact Us" />
						<h3>Contact Us</h3>
						<p>Contact our customer service via phone or chat</p>
					</div>
				</div>
				<YourAccountBanner/>
			</div>
			<Footer/>
		</>
	);
};

export default Account;
