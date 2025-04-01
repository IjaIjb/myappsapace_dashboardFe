import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHistory,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaHeart,
  FaUserCog,
  FaSignOutAlt,
  FaBoxes,
  FaClock,
} from "react-icons/fa";

function SideBar() {
  const location = useLocation();

  const tabs = [
    { id: "Dashboard", route: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt size={18} /> },
    { id: "Order History", route: "/order-history", label: "Order History", icon: <FaHistory size={18} /> },
    { id: "Track Order", route: "/track-order", label: "Track Order", icon: <FaMapMarkerAlt size={18} /> },
    { id: "Shopping Cart", route: "/shopping-cart", label: "Shopping Cart", icon: <FaShoppingCart size={18} /> },
    { id: "Wishlist", route: "/wishlist", label: "Wishlist", icon: <FaHeart size={18} /> },
    { id: "Address", route: "/address", label: "Address", icon: <FaBoxes size={18} /> },
    { id: "Browsing History", route: "/browsing-history", label: "Browsing History", icon: <FaClock size={18} /> },
    { id: "Setting", route: "/settings", label: "Settings", icon: <FaUserCog size={18} /> },
    { id: "Log Out", route: "/logout", label: "Log Out", icon: <FaSignOutAlt size={18} /> },
  ];

  return (
    <div className="w-[20%] self-start py-3 rounded-lg bg-white border shadow-md">
      <ul>
        {tabs.map((tab) => (
          <li key={tab.id}>
            <NavLink
              to={tab.route}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 text-sm cursor-pointer transition-all duration-300 w-full ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
                }`
              }
            >
              {tab.icon}
              <span className="flex-1">{tab.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
