import React from "react";
import "../../styles/Wishlist.css"; // Ensure this file contains the updated styles

function Wishlist() {
  const userInfo = {
    name: "Khushi Agarwal",
    location: "Warsaw, Poland",
    wishes: 12,
    messages: 3,
    completedOrders: 55,
    categories: [
      "T-Shirts & Tops",
      "Activewear",
      "Sweaters",
      "Skirts & Shorts",
      "Outwear & Blazers",
      "Accessories & Shoes",
    ],
  };

  const WishlistProducts = [
    {
      id: 1,
      name: "Flared Sleeves Sweater",
      price: 19.99,
      image: "/Flared Sleeves Sweater.jpg",
    },
    {
      id: 2,
      name: "V-Neck Sweater",
      price: 35.99,
      image: "/V-Neck Sweater.jpg",
    },
    {
      id: 3,
      name: "V-Neck Sweater",
      price: 35.99,
      image: "/V-Neck Sweater.jpg",
    },
  ];

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>

      <div className="wishlist-product-grid">
        {WishlistProducts.map((product) => (
          <div className="wishlist-product-card" key={product.id}>
            <div className="wishlist-product-info">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="wishlist-product-image"
              />

              {/* Product Details */}
              <div className="wishlist-product-details">
                <h3 className="wishlist-product-name">{product.name}</h3>
                <p className="wishlist-product-color">Color: Blue</p>
                <p className="wishlist-product-price">
                  $ {product.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="wishlist-actions">
              <button className="wishlist-add-to-bag">Add to shopping bag</button>
              <button className="wishlist-remove-btn">🗑</button>
            </div>
          </div>
        ))}
      </div>

      <button className="wishlist-add-all-btn">
        Add all to Shopping Bag
      </button>
    </div>
  );
}

export default Wishlist;
