import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/Cart.css";
import { getCart, updateCart } from "../../redux/Actions/cartAction";

const CartPage = () => {
	const dispatch = useDispatch();
	const {loading,message,error,cart} = useSelector((state) => state.cartAuth);

	const handleQuantityChange = (id, qty) => {
		if (qty > 0) {
			dispatch(updateCart(id, qty));
		}
	};

	const handleRemove = (id) => {
		// dispatch(removeFromCart(id));
	};
	useEffect(()=>{
		dispatch(getCart());
	},[])
	useEffect(() => {
		
		if(message){
			
			dispatch({type:"CLEAR_MESSAGE"})
		}
		if(error){
			dispatch({type:"CLEAR_ERROR"})
		}
	}, [message,error]);

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
						{cart && cart.products .map((item) => (

							<div className="cart-item" key={item?.productId?._id}>
								<img src={item?.productId?.image?.url} alt={item?.name} />
								<div>
									<h2>{item?.productId?.description}</h2>
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
