import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RightSide/RightSide";
import Orders from "./components/Orders/Orders";
import Customers from "./components/Customers/Customers";
import Products from "./components/Products/Products";
import "./Admin.css";

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const renderContent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return (
          <>
            <MainDash />
            <RightSide />
          </>
        );
      case "Orders":
        return <Orders />;
      case "Customers":
        return <Customers />;
      case "Products":
        return <Products />;
      default:
        return (
          <>
            <MainDash />
            <RightSide />
          </>
        );
    }
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar setSelectedComponent={setSelectedComponent} />
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Admin;
