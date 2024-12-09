import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../../redux/Actions/orderAction";

const Orders = () => {
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Simulated API call
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         // Replace this with your actual backend API endpoint
//         const response = await fetch("https://api.example.com/orders");
//         const data = await response.json();
//         setOrderData(data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch orders. Please try again later.");
//         setLoading(false);
//       }
//     };

//     // Simulate a delay for testing purposes
//     setTimeout(fetchOrders, 1000); // Static data for now
//   }, []);

//   // Static fallback data for testing
//   const staticData = [
//     { id: 1, customer: "John Doe", total: "$150", date: "2024-12-01" },
//     { id: 2, customer: "Jane Smith", total: "$200", date: "2024-12-03" },
//     { id: 3, customer: "Alice Johnson", total: "$120", date: "2024-12-05" },
//   ];

//   useEffect(() => {
//     if (orderData.length === 0 && !loading) {
//       setOrderData(staticData);
//     }
//   }, [orderData, loading]);

const dispatch=useDispatch();

  const{ orders, loading,error}= useSelector(state=>state.orderAuth);

  useEffect(()=>{
    dispatch(getAllOrders())

  },[dispatch])


  return (
    <div className="orders">
      <h2>Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders&&orders.map((order) => (
              <tr key={order?._id}>
                <td>{order?._id}</td>
                <td>{order?.paymentMethod}</td>
                <td>{order?.status}</td>
                <td>{order?.totalAmount}</td>
                <td>{order?.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
