import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../../redux/Actions/orderAction";
import "./Orders.css";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orderAuth);

  // Fetch orders on mount and poll every 10 seconds
  useEffect(() => {
    dispatch(getAllOrders());
    const interval = setInterval(() => {
      dispatch(getAllOrders());
    }, 10000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [dispatch]);

  return (
    <div className="orders">
      <h2>All Orders</h2>
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
            {orders &&
              orders.map((order) => (
                <tr key={order?._id}>
                  <td>{order?._id}</td>
                  <td>{order?.paymentMethod}</td>
                  <td>{order?.status}</td>
                  <td>₹{order?.totalAmount.toFixed(2)}</td>
                  <td>{new Date(order?.createdAt).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
