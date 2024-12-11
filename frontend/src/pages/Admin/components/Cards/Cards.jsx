import React, { useEffect, useState } from "react";
import "./Cards.css";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../../redux/Actions/orderAction";
import { getAllProducts } from "../../../../redux/Actions/productAction";

const Cards = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderAuth);
  const { products } = useSelector((state) => state.productAuth);

  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [xAxisDates, setXAxisDates] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // Generate last 7 days including today
    const getLast7Days = () => {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString("en-US")); // Local timezone
      }
      return days;
    };

    const last7Days = getLast7Days();
    setXAxisDates(last7Days); // Set dates for X-axis

    if (orders) {
      // Normalize dates for sales
      const salesCount = last7Days.map((date) =>
        orders.filter(
          (order) =>
            new Date(order.createdAt).toLocaleDateString("en-US") === date
        ).length
      );

      // Normalize dates for revenue
      const revenueCount = last7Days.map((date) =>
        orders
          .filter(
            (order) =>
              new Date(order.createdAt).toLocaleDateString("en-US") === date
          )
          .reduce((acc, order) => acc + order.totalAmount, 0)
      );

      setSalesData(salesCount);
      setRevenueData(revenueCount);
    }

    if (products) {
      // Normalize dates for products
      const productsCount = last7Days.map((date) =>
        products.filter(
          (product) =>
            new Date(product.createdAt).toLocaleDateString("en-US") === date
        ).length
      );

      setProductsData(productsCount);
    }
  }, [orders, products]);

  const analyticsData = [
    {
      title: "Sales",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      value: salesData.reduce((a, b) => a + b, 0),
      series: [{ name: "Sales", data: salesData, xAxisDates }],
      chartType: "bar",
    },
    {
      title: "Revenue",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      value: `₹${revenueData.reduce((a, b) => a + b, 0).toFixed(2)}`,
      series: [{ name: "Revenue", data: revenueData, xAxisDates }],
      chartType: "line",
    },
    {
      title: "Products",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      value: productsData.reduce((a, b) => a + b, 0),
      series: [{ name: "Products", data: productsData, xAxisDates }],
      chartType: "area",
    },
  ];

  return (
    <div className="Cards">
      {analyticsData.map((card, index) => (
        <div className="parentContainer" key={index}>
          <Card
            title={card.title}
            color={card.color}
            value={card.value}
            series={card.series}
            chartType={card.chartType}
            xAxisDates={xAxisDates} // Pass updated X-axis dates
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
