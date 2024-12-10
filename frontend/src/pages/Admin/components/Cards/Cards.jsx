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

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const getLast7Days = () => {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toISOString().split("T")[0]); // YYYY-MM-DD
      }
      return days;
    };

    const last7Days = getLast7Days();

    if (orders) {
      const salesCount = last7Days.map((date) =>
        orders.filter((order) => order.createdAt.startsWith(date)).length
      );

      const revenueCount = last7Days.map((date) =>
        orders
          .filter((order) => order.createdAt.startsWith(date))
          .reduce((acc, order) => acc + order.totalAmount, 0)
      );

      setSalesData(salesCount);
      setRevenueData(revenueCount);
    }

    if (products) {
      const productsCount = last7Days.map((date) =>
        products.filter((product) => product.createdAt.startsWith(date)).length
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
      percentage: (salesData.reduce((a, b) => a + b, 0) / 100), // Example percentage calculation
      series: [
        {
          name: "Sales",
          data: salesData,
        },
      ],
      chartType: "bar",
    },
    {
      title: "Revenue",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      value: `$${revenueData.reduce((a, b) => a + b, 0).toFixed(2)}`,
      percentage: (revenueData.reduce((a, b) => a + b, 0) / 100), // Example calculation
      series: [
        {
          name: "Revenue",
          data: revenueData,
        },
      ],
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
      percentage: (productsData.reduce((a, b) => a + b, 0) / 100), // Example calculation
      series: [
        {
          name: "Products",
          data: productsData,
        },
      ],
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
            percentage={card.percentage}
            series={card.series}
            chartType={card.chartType}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
