import React, { useState, useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../../redux/Actions/productAction";

const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Replace with your API endpoint
//         const response = await fetch("https://api.example.com/products");
//         const data = await response.json();
//         setProducts(data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch products. Please try again later.");
//         setLoading(false);
//       }
//     };

//     setTimeout(fetchProducts, 1000); // Simulate delay
//   }, []);

  const dispatch=useDispatch();

  const{ products, loading,error}= useSelector(state=>state.productAuth);

  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch])

  return (
    <div className="products">
      <h2>Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product) => (
              <tr key={product?._id}>
                <td>{product?._id}</td>
                <td>{product?.description}</td>
                <td>{product?.category}</td>
                <td>{product?.price}</td>
                <td>{new Date(product?.createdAt).toLocaleDateString("en-US") }</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
