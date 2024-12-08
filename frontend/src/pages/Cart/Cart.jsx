import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/Cart.css";
import { getCart, updateCart, clearCart } from "../../redux/Actions/cartAction";
import Header from "../../components/Header/Header";
import { getUserAddress } from "../../redux/Actions/userActions";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
    const dispatch = useDispatch();
    const { loading, message, error, cart } = useSelector(
		(state) => state.cartAuth
	);
	const { address } = useSelector((state) => state.userAuth); // Access the user's address from Redux

    const handleQuantityChange = (id, qty) => {
        if (qty > 0) {
            dispatch(updateCart(id, qty));
        }
    };

    const handleRemove = (id) => {
        // Future: dispatch(removeProductFromCart(id));
        // console.log(`Remove product with id: ${id}`);
    };
	const handleClearCart = () => {
		dispatch(clearCart()); // Dispatch action to clear the cart
	};
	useEffect(() => {
        dispatch(getCart());
		dispatch(getUserAddress());
		
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            console.log(message);
            dispatch({ type: "CLEAR_MESSAGE" });
        }
        if (error) {
            console.error(error);
            dispatch({ type: "CLEAR_ERROR" });
        }
    }, [message, error, dispatch]);

    const makePayment = async () => {
		   const stripe = await loadStripe("pk_test_51QTgDEGoyVahLKeKA2Pdrpendbz0FDSLITgG8lEtQvhnR4pwsggPCIQ8Lyn68xm7vxnCcpIjVIqQlNruBwsupIob00Xzq5UCeM");

        const body = {
            products: cart?.products.map((item) => ({
                name: item?.productId?.name,
                image: item?.productId?.image?.url,
                price: item?.price,
                quantity: item?.quantity,
            })),
        };

        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await fetch(`http://localhost:4876/api/v1/cart/create-checkout-session`,{
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error("Error during payment:", error);
        }
    };

    

    const calculateTotal = () =>
        cart?.products?.reduce((acc, item) => acc + item.price * item.quantity, 0);

   // Find the default address from the user's addresses
	const defaultAddress = address?.find((addr) => addr.isDefault);
	console.log("Address Array:", address); // Log the full address array
	console.log("Default Address:", defaultAddress); // Log the found default address

	return (
		<>
			<Header />
			<div className="cart-page">
				<h1>Your Shopping Cart</h1>
				{cart?.products?.length === 0 ? (
					<div className="cart-empty">
						<p>Your cart is currently empty.</p>
						<Link to="/" className="continue-shopping">
							Continue Shopping
						</Link>
					</div>
				) : (
					<div className="cart-container">
						<div className="cart-items">
							{cart &&
								cart.products.map((item) => (
									<div className="cart-item" key={item?.productId?._id}>
										<img
											src={item?.productId?.image?.url}
											alt={item?.name}
											className="cart-item-image"
										/>
										<div className="cart-item-details">
											<h2 className="item-title">
												{item?.productId?.description}
											</h2>
											<p className="item-price">${item?.price}</p>
											<div className="quantity-control">
												<button
													className="quantity-btn"
													onClick={() =>
														handleQuantityChange(
															item?.productId?._id,
															item?.quantity - 1
														)
													}
												>
													-
												</button>
												<span className="quantity">{item?.quantity}</span>
												<button
													className="quantity-btn"
													onClick={() =>
														handleQuantityChange(
															item?.productId?._id,
															item?.quantity + 1
														)
													}
												>
													+
												</button>
											</div>
											<button
												className="remove-btn"
												onClick={() => handleRemove(item?.productId?._id)}
											>
												Remove
											</button>
										</div>
									</div>
								))}
						</div>
						<div className="cart-summary">
							{/* Default Address Section */}
							<div className="address-section">
								<h3>Shipping Address</h3>
								{defaultAddress ? (
									<div className="address-details">
										<p>{defaultAddress?.address}</p>
									</div>
								) : (
									<p>No address found. Please update your address.</p>
								)}
							</div>

							<h2>Order Summary</h2>
							<div className="summary-details">
								<p>Subtotal: </p>
								<p>${calculateTotal()}</p>
							</div>

							{/* Payment buttons */}
							<div className="payment-methods">
								<Link to="/pay-online" className="pay-online-btn" onClick={makePayment}>
									Pay Online
								</Link>
								<Link to="/cod" className="cod-btn">
									Cash on Delivery
								</Link>
							</div>
						</div>
					</div>
				)}
				{/* Add the Clear Cart button */}
				{cart?.products?.length > 0 && (
					<div className="clear-cart-container">
						<button className="clear-cart-btn" onClick={handleClearCart}>
							Clear Cart
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default CartPage;
