import React, { useState } from "react";
import "./Card.css";
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// Main Card Component
const Card = ({ title, color, value, series, chartType }) => {
  const [expanded, setExpanded] = useState(false);

  return expanded ? (
    <ExpandedCard
      title={title}
      color={color}
      value={value}
      series={series}
      chartType={chartType}
      setExpanded={() => setExpanded(false)}
    />
  ) : (
    <CompactCard
      title={title}
      color={color}
      value={value}
      setExpanded={() => setExpanded(true)}
      titleType={title} // Pass the card type to decide which icon to show
    />
  );
};

// Compact Card - Replaced progress bar with icons
function CompactCard({ title, color, value, setExpanded, titleType }) {
  const handleIconAnimation = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { duration: 0.3 },
    },
    initial: { scale: 1 },
  };

  return (
    <motion.div
      className="CompactCard"
      style={{
        background: color.backGround,
        boxShadow: color.boxShadow,
      }}
      onClick={setExpanded}
    >
      <div className="iconContainer">
        {/* Dynamically show animated SVG icons */}
        {titleType === "Sales" && (
          <motion.div
            variants={handleIconAnimation}
            initial="initial"
            whileHover="hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 4v16h18V4H3zm16 14H5v-2h14v2zm0-4H5v-2h14v2zm0-4H5V8h14v2z" />
            </svg>
          </motion.div>
        )}
        {titleType === "Revenue" && (
          <motion.div
            variants={handleIconAnimation}
            initial="initial"
            whileHover="hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.523 0-10-4.478-10-10s4.478-10 10-10 10 4.478 10 10-4.478 10-10 10zm5-7h-4v-2h4v2zm-6 0H7v-2h4v2z" />
            </svg>
          </motion.div>
        )}
        {titleType === "Products" && (
          <motion.div
            variants={handleIconAnimation}
            initial="initial"
            whileHover="hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 9V7a2 2 0 0 0-2-2h-4V2H9v3H5a2 2 0 0 0-2 2v2H0v2h2v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9h2zM9 4h6v2H9V4zm11 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16v9z" />
            </svg>
          </motion.div>
        )}
      </div>
      <div className="detail">
        <span>{title}</span>
        <span>{value}</span>
      </div>
    </motion.div>
  );
}

// Expanded Card Logic
function ExpandedCard({ title, color, value, series, chartType, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: chartType,
        height: 350,
      },
      xaxis: {
        categories: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date.toISOString().split("T")[0];
        }),
        title: { text: "Last 7 Days" },
      },
      yaxis: {
        title: { text: title },
      },
    },
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: color.backGround,
        boxShadow: color.boxShadow,
      }}
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={series} type={chartType} />
      </div>
      <span>{value}</span>
    </motion.div>
  );
}

export default Card;
