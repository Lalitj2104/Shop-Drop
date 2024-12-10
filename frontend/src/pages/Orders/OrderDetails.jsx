import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styles/OrderDetails.css";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUId } from "../../redux/Actions/orderAction";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, order } = useSelector((state) => state.orderAuth);

  useEffect(() => {
    dispatch(getOrderByUId(id));
    console.log(order);
  }, [dispatch]);

  console.log(order);

  const [activeTab, setActiveTab] = useState("details");

  if (!order) return <p>Order not found</p>;

  return (
    <>
      <Header />
      <div className="order-details">
        <Link to="/orders">
          <button className="back-button">Back to Orders</button>
        </Link>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`tab ${activeTab === "items" ? "active" : ""}`}
            onClick={() => setActiveTab("items")}
          >
            Items
          </button>
        </div>

        {activeTab === "details" && (
          <div className="details-tab">
            <p>
              <strong>Payment method:</strong> {order?.paymentMethod || "n/a"}
            </p>
            <p>
              <strong>Ordered On:</strong>{" "}
              {order?.createdAt
                ? new Date(order.createdAt).toISOString().split("T")[0]
                : "n/a"}
            </p>
            <p>
              <strong>Delivering To:</strong> {order?.shippingAddress}
            </p>
            <p>
              <strong>Estimated Delivery:</strong>{" "}
              {order?.createdAt
                ? new Date(
                    new Date(order?.createdAt).setDate(
                      new Date(order?.createdAt).getDate() + 5
                    )
                  )
                    .toISOString()
                    .split("T")[0]
                : "n/a"}
            </p>
            <p>
              <strong>Order Summary:</strong> {order?.status}
            </p>
            <button className="download-invoice">Download Invoice</button>
          </div>
        )}

        {activeTab === "items" && (
          <div className="items-tab">
            <ul>
              {order?.products.map((item, index) => (
                <li key={index} className="item">
                  <div className="item-image">
                    <img
                      src={item?.productId?.image?.url}
                      alt={item?.productId?.name}
                    />
                  </div>
                  <div className="item-details">
                    <p>
                      <strong>{item?.productId?.name}</strong>
                    </p>
                    <p>{item?.productId?.description}</p>
                    <p>Quantity: {item?.quantity}</p>
                    <p>Price: ₹{item?.productId?.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
