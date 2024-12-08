import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/Cart.css";
import { getCart, updateCart } from "../../redux/Actions/cartAction";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
    const dispatch = useDispatch();
    const { loading, message, error, cart } = useSelector((state) => state.cartAuth);

    const handleQuantityChange = (id, qty) => {
        if (qty > 0) {
            dispatch(updateCart(id, qty));
        }
    };

    const handleRemove = (id) => {
        // Future: dispatch(removeProductFromCart(id));
        // console.log(`Remove product with id: ${id}`);
    };

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

    useEffect(() => {
        dispatch(getCart());
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

    const calculateTotal = () =>
        cart?.products?.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            {cart?.products?.length === 0 ? (
                <div className="cart-page-empty">
                    <p>Your cart is empty.</p>
                    <Link to="/">Go Shopping</Link>
                </div>
            ) : (
                <div className="cart-container">
                    <div className="cart-items">
                        {cart?.products.map((item) => (
                            <div className="cart-item" key={item?.productId?._id}>
                                <img src={item?.productId?.image?.url} alt={item?.productId?.name} />
                                <div>
                                    <h2>{item?.productId?.name}</h2>
                                    <p>${item?.price}</p>
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(item?.productId?._id, item?.quantity - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item?.quantity}</span>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(item?.productId?._id, item?.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button onClick={() => handleRemove(item?.productId?._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Cart Summary</h2>
                        <p>Subtotal: ${calculateTotal()}</p>
                        <button onClick={makePayment}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;