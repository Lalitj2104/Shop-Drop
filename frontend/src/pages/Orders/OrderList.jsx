import { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import staticOrders from "../../data/staticOrders";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulating fetching data from a backend
    setOrders(staticOrders); // Replace with API call if needed
  }, []);

  if (orders.length === 0) {
    return <p>Loading orders...</p>;
  }

  return (
    <>
    <Header/>
    <div style={{ padding: "20px" }}>
      {orders.map((order) => (
        <OrderCard key={order.orderNo} order={order} />
      ))}
      </div>
      <Footer/>
      </>
  );
};

export default OrderList;
