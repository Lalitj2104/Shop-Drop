// src/data/staticOrders.js
const staticOrders = [
    {
      orderNo: "ORD12345",
      phone: "+91 9876543210",
      placedOn: "2024-12-01",
      amount: 2500,
      itemsCount: 3,
      orderStatus: "Delivered",
      paymentStatus: "Paid",
      orderedOn: "2024-11-29",
      deliveringTo: "123 Street, City, India",
      estimatedDelivery: "2024-12-05",
      summary: "Order was delivered successfully.",
      items: [
        { name: "Item 1", quantity: 1, price: 500 },
        { name: "Item 2", quantity: 2, price: 1000 },
      ],
    },
    {
      orderNo: "ORD67890",
      phone: "+91 9988776655",
      placedOn: "2024-12-02",
      amount: 4000,
      itemsCount: 5,
      orderStatus: "Shipped",
      paymentStatus: "Pending",
      orderedOn: "2024-12-01",
      deliveringTo: "456 Avenue, Town, India",
      estimatedDelivery: "2024-12-10",
      summary: "Your order is on the way.",
      items: [
        { name: "Item 3", quantity: 2, price: 2000 },
        { name: "Item 4", quantity: 1, price: 500 },
      ],
    },
  ];
  
  export default staticOrders;
  