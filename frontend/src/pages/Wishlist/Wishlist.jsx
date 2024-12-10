import "../../styles/Wishlist.css"; // Updated styles for horizontal cards
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWishList, removeWishList } from "../../redux/Actions/wishListAction";
import { addToCart } from "../../redux/Actions/cartAction";

function Wishlist() {
  const dispatch = useDispatch();
	const { wishList } = useSelector((state) => state.wishListAuth);
	// const WishlistProducts = [
	// 	{
	// 		id: 1,
	// 		name: "Flared Sleeves Sweater",
	// 		price: 19.99,
	// 		image: "/Flared Sleeves Sweater.jpg",
	// 		color: "Beige",
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "V-Neck Sweater",
	// 		price: 35.99,
	// 		image: "/V-Neck Sweater.jpg",
	// 		color: "Light Blue",
	// 	},
	// 	{
	// 		id: 3,
	// 		name: "Casual Knitwear",
	// 		price: 25.99,
	// 		image: "/Casual Knitwear.jpg",
	// 		color: "Gray",
	// 	},
  // ];
 
  useEffect(() => {
    dispatch(getWishList());
    console.log("Wishlist: ", wishList);
  }, [dispatch]);

	return (
		<>
			<Header />
			<div className="wishlist-container">
				<h2 className="wishlist-title">Your Wishlist</h2>
				<p className="wishlist-subtitle">Keep track of items you love</p>

				<div className="wishlist-list">
					<div className="wishlist-list">
						{Array.isArray(wishList?.products) ? (
							wishList.products.map((product) => (
								<div
									className="wishlist-horizontal-card"
									key={product._id || product.id}
								>
									{/* Product Image */}
									<div className="wishlist-image-wrapper">
										<img
											src={product?.image?.url}
											alt={product?.name}
											className="wishlist-image"
										/>
									</div>

									{/* Product Details */}
									<div className="wishlist-details">
                    <h3 className="wishlist-name">{product?.name}</h3>
                    <p>{product?.description}</p>
										<p className="wishlist-price">$ {product?.price}</p>
									</div>

									{/* Action Buttons */}
									<div className="wishlist-actions">
										<button className="wishlist-add-to-cart" onClick={() => dispatch(addToCart(product?._id, 1))}>Add to Bag</button>
                    <button className="wishlist-remove" onClick={() => dispatch(removeWishList(product?._id))}>🗑</button>
									</div>
								</div>
							))
						) : (
							<p>Your wishlist is empty.</p>
						)}
					</div>
				</div>

				{/* Add All Button */}
				<div className="wishlist-add-all">
					<button>Add All to Bag</button>
				</div>
			</div>
		</>
	);
}

export default Wishlist;
