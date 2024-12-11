import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/Actions/productAction";
import Loading from "../../../components/Loading/LoadingPage";
import "../../../styles/ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.productAuth);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Adjust max price based on your product range
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // State for sorting order
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Update filtered products whenever the price range, products or sort order changes
  useEffect(() => {
    if (products) {
      let filtered = products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );

      // Sorting the filtered products based on the selected sort order
      if (sortOrder === "AtoZ") {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === "ZtoA") {
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
      }

      setFilteredProducts(filtered);
    }
  }, [minPrice, maxPrice, products, sortOrder]);

  // Function to clear filter and show all products
  const clearFilter = () => {
    setMinPrice(0);
    setMaxPrice(20000); // Adjust this to the initial range
    setSortOrder(""); // Reset the sort order
    setFilteredProducts(products); // Reset filtered products
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div
          className="sidebar"
          style={{
            width: "250px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Filter by Price</h3>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Min Price:
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "80px",
                  borderRadius: "4px",
                }}
              />
            </label>
            <label>
              Max Price:
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "80px",
                  borderRadius: "4px",
                }}
              />
            </label>
          </div>

          <button
            onClick={clearFilter}
            style={{
              padding: "10px 20px",
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Clear Filter
          </button>

          {/* Sort by Alphabet Dropdown */}
          <h3 style={{ marginTop: "30px" }}>Sort by Alphabet</h3>
          <div className="sort-dropdown">
            <button
              className="dropdown-button"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
              style={{
                padding: "10px 20px",
                marginTop: "15px",
                backgroundColor: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Sort by Alphabet
            </button>
            {dropdownOpen && ( // Show dropdown only when dropdownOpen is true
              <div className="dropdown-content">
                <button onClick={() => setSortOrder("AtoZ")}>A to Z</button>
                <button onClick={() => setSortOrder("ZtoA")}>Z to A</button>
              </div>
            )}
          </div>
        </div>

        <div
          className="product-list"
          style={{
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
