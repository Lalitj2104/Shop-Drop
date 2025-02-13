import { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import staticOrders from "../../data/staticOrders";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser } from "../../redux/Actions/orderAction";

const OrderList = () => {
  
  const dispatch=useDispatch();
  const {orders}=useSelector(state=>state.orderAuth);
  

  useEffect(() => {
    dispatch(getOrderByUser());
  }, [dispatch]);
  console.log(orders)
  // const rev = orders.reverse();
  // orders = [...rev];
  if (orders?.length === 0) {
    return <p>No orders found</p>;
  }

  return (
    <>
    <Header/>
    <div style={{ padding: "20px" }}>
      {orders && [...orders].reverse()?.map((item) => (
        
        <OrderCard key={item?._id} order={item} />
      ))}
      </div>
      </>
  );
};

export default OrderList;
