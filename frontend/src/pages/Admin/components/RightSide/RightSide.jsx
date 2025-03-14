import React from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <h2>Updates</h2>
        <h4>No recent updates</h4>
        {/* <Updates /> */}
      </div>
      <div>
        {/* <h3>Customer Review</h3>
        <CustomerReview /> */}
      </div>
    </div>
  );
};

export default RightSide;
