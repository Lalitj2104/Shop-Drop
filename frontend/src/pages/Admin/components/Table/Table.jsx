import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

// Updated makeStyle function
const makeStyle = (status) => {
  if (status === "Delivered") {
    return {
      background: "#c3f9d4",
      color: "green",
      fontWeight: "bold",
      borderRadius: "8px",
      padding: "6px 12px",
      textAlign: "center",
    };
  } else if (status === "Pending") {
    return {
      background: "#d4e6fc",
      color: "#1f77d0",
      fontWeight: "bold",
      borderRadius: "8px",
      padding: "6px 12px",
      textAlign: "center",
    };
  } else if (status === "Cancelled") {
    return {
      background: "#ffadad8f",
      color: "red",
      fontWeight: "bold",
      borderRadius: "8px",
      padding: "6px 12px",
      textAlign: "center",
    };
  }
  return {}; // Default styles for other cases
};

export default function LatestOrdersTable({ orders }) {
  return (
    <div className="latest-orders">
      <h3>Recent Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: "12px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
      
            <TableRow>
              <TableCell>Payment Method</TableCell>
              <TableCell align="left">Order ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order?._id}>
                  <TableCell>{order?.paymentMethod}</TableCell>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{new Date(order?.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span style={makeStyle(order?.status)}>{order?.status}</span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No recent orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
