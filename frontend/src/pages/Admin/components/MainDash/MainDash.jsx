import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import LatestOrdersTable from "../Table/Table";
import { useSelector } from "react-redux";
const MainDash = () => {
  const { orders, loading, error } = useSelector((state) => state.orderAuth);
  // Get the latest 5 orders
  const latestOrders = orders ? orders.slice(-5).reverse() : []; 

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <Table orders={latestOrders}/>
    </div>
  );
};

export default MainDash;
