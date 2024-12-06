import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import staticProducts from "../../../data/staticProducts";
import "../../../styles/ProductPage.css";
import { getProduct } from "../../../redux/Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/Actions/cartAction";
import toastOptions from "../../../constants/toast";
import { toast } from "react-toastify";

const useStaticData = true; // Set to `false` to fetch data from backend

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [wishlistActive, setWishlistActive] = useState(false);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productAuth);
  const { message, error,loading } = useSelector((state) => state.cartAuth);

  // Static reviews with title, description, likes, dislikes
  const staticReviews = [
    {
      title: "Amazing product",
      description: "I loved the quality and the features. Will recommend!",
      likes: 5,
      dislikes: 1,
    },
    {
      title: "Good value for money",
      description: "Worth the price. Delivery was also on time.",
      likes: 3,
      dislikes: 0,
    },
    {
      title: "Decent but could be better",
      description: "The packaging was not great but overall good quality.",
      likes: 2,
      dislikes: 2,
    },
  ];
  const [reviews, setReviews] = useState(staticReviews);
  const [newReview, setNewReview] = useState({
    title: "",
    description: "",
  });

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     if (useStaticData) {
  //       const product = staticProducts.find((p) => p.id === parseInt(id, 10));
  //       setProduct(product || null);
  //       setLoading(false);
  //     } else {
  //       try {
  //         setLoading(true);
  //         const response = await fetch(`https://example.com/api/products/${id}`);
  //         if (!response.ok) throw new Error("Failed to fetch product.");
  //         const data = await response.json();
  //         setProduct(data);
  //       } catch (error) {
  //         console.error(error);
  //         setProduct(null);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value);
  };

  const toggleWishlist = () => {
    setWishlistActive((prev) => !prev);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product?._id,quantity));
    
  };
  useEffect(()=>{
    if (message) {
      toast.success(message, toastOptions);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
    if (error) {
      toast.error(error, toastOptions);
      dispatch({ type: "CLEAR_ERROR" });
    }
  },[message,error])

  const handleReviewSubmit = () => {
    if (newReview.title.trim() && newReview.description.trim()) {
      setReviews((prev) => [...prev, { ...newReview, likes: 0, dislikes: 0 }]);
      setNewReview({ title: "", description: "" });
    }
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  return (
    <div className="product-page-container">
      <button
        onClick={() => navigate("/shop")}
        className="product-page-back-button"
      >
        Back to Products
      </button>
      <div className="product-page-content">
        <img
          src={product?.image?.url}
          alt={product?.name}
          className="product-page-image"
        />
        <div className="product-page-details">
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <p>
            <strong>Price:</strong> ${product?.price?.toFixed(2)}
          </p>

          <div className="quantity-container">
            <label htmlFor="quantity-select">Quantity:</label>
            <select
              id="quantity-select"
              className="quantity-dropdown"
              value={quantity}
              onChange={handleQuantityChange}
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="product-action-buttons">
            <button
              className={`wishlist-button ${wishlistActive ? "active" : ""}`}
              onClick={toggleWishlist}
            >
              ♥
            </button>
            <button className="share-button">⤴</button>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="review-section">
        <h3>Reviews</h3>
        <ul className="review-list">
          {reviews.length ? (
            reviews.map((review, index) => (
              <li key={index} className="review-item">
                <h4>{review.title}</h4>
                <p>{review.description}</p>
                <div>
                  <button>👍 {review.likes}</button>
                  <button>👎 {review.dislikes}</button>
                </div>
              </li>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </ul>
        <div className="review-form">
          <input
            type="text"
            value={newReview.title}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Title"
          />
          <textarea
            value={newReview.description}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Description"
            rows="3"
          ></textarea>
          <button onClick={handleReviewSubmit} className="submit-review">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
