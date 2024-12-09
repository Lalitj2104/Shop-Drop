import React, { useState, useEffect } from "react";
import "./Customers.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/Actions/userActions";

const Customers = () => {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         // Replace with your API endpoint
//         const response = await fetch("https://api.example.com/customers");
//         const data = await response.json();
//         setCustomers(data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch customers. Please try again later.");
//         setLoading(false);
//       }
//     };

//     setTimeout(fetchCustomers, 1000); // Simulate delay
//   }, []);

const dispatch=useDispatch();

  const{ users, loading,error}= useSelector(state=>state.userAuth);

  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch])

  return (
    <div className="customers">
      <h2>Customers</h2>
      {loading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users&&users.map((customer) => (
              <tr key={customer?._id}>
                <td>{customer?._id}</td>
                <td>{customer?.firstName} {customer?.lastName}</td>
                <td>{customer?.email}</td>
                <td>{customer?.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Customers;
