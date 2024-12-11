import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";
import { logout } from "../../../redux/Actions/adminAction";
import { useDispatch } from "react-redux";

const SidebarData = [
  { icon: UilEstate, heading: "Dashboard" },
  { icon: UilClipboardAlt, heading: "Orders" },
  { icon: UilUsersAlt, heading: "Customers" },
  { icon: UilPackage, heading: "Products" },
  { icon: UilChart, heading: "Analytics" },
];

const Sidebar = ({ setSelectedComponent }) => {
  const [selected, setSelected] = useState(0);
  const handleMenuClick = (index, heading) => {
    setSelected(index);
    setSelectedComponent(heading);
  };
  const dispatch=useDispatch();

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Shop<span>&</span>Drop
        </span>
      </div>
      <div className="menu">
        {SidebarData.map((item, index) => (
          <div
            className={selected === index ? "menuItem active" : "menuItem"}
            key={index}
            onClick={() => handleMenuClick(index, item.heading)}
          >
            <item.icon />
            <span>{item.heading}</span>
          </div>
        ))}
        <div
          className="menuItem signOut"
          onClick={() => dispatch(logout())}
        >
          <UilSignOutAlt />
          <span>SignOut</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
