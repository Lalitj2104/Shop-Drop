import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCart, removeFromCart } from "../redux/actions/cartActions";
import "../../styles/Cart.css";

const CartPage = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const handleQuantityChange = (id, qty) => {
		if (qty > 0) {
			dispatch(updateCart(id, qty));
		}
	};

	const handleRemove = (id) => {
		dispatch(removeFromCart(id));
	};

	useEffect(() => {
		// Fetch cart data if needed
	}, [dispatch]);

	const calculateTotal = () =>
		cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

	return (
		<div className="cart-page">
			<h1>Shopping Cart</h1>
			{cartItems.length === 0 ? (
				<div className="cart-page-empty">
					<p>Your cart is empty.</p>
					<Link to="/">Go Shopping</Link>
				</div>
			) : (
				<div className="cart-container">
					<div className="cart-items">
						{cartItems.map((item) => (
							<div className="cart-item" key={item.id}>
								<img src={item.image} alt={item.name} />
								<div>
									<h2>{item.name}</h2>
									<p>${item.price}</p>
									<div>
										<button
											onClick={() =>
												handleQuantityChange(item.id, item.quantity - 1)
											}
										>
											-
										</button>
										<span>{item.quantity}</span>
										<button
											onClick={() =>
												handleQuantityChange(item.id, item.quantity + 1)
											}
										>
											+
										</button>
									</div>
									<button onClick={() => handleRemove(item.id)}>Remove</button>
								</div>
							</div>
						))}
					</div>
					<div className="cart-summary">
						<h2>Cart Summary</h2>
						<p>Subtotal: ${calculateTotal().toFixed(2)}</p>
						<button>
							<Link to="/checkout">Proceed to Checkout</Link>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
