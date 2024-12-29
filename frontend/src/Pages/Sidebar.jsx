import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation(); 
  const [active, setActive] = useState(location.pathname); 

  const isActive = (path) => active === path ? "bg-gray-700" : "";

  return (
    <div
      className={`bg-gray-800 text-white fixed top-0 left-0 h-full ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      <div className="flex justify-between p-4">
        {!collapsed && <h2 className="text-lg font-semibold">MyApp</h2>}

        {collapsed ? (
          <button onClick={toggleSidebar} className="bg-gray-700 p-2 rounded-md">
            <IoIosArrowForward />
          </button>
        ) : (
          <button onClick={toggleSidebar} className="bg-gray-700 p-2 rounded-md">
            <IoIosArrowBack />
          </button>
        )}
      </div>

      <div className="flex flex-col p-4 gap-4">
        <Link
          to="/dashboard"
          className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md ${isActive('/home')}`}
          onClick={() => setActive('/dashboard')} 
        >
          <FaHome className="text-xl" />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <Link
          to="/product-handover"
          className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md ${isActive('/home')}`}
          onClick={() => setActive('/product-handover')} 
        >
          <FaHome className="text-xl" />
          {!collapsed && <span>Product Handover</span>}
        </Link>
        
        <Link
          to="/product-return"
          className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md ${isActive('/home')}`}
          onClick={() => setActive('/product-return')} 
        >
          <FaHome className="text-xl" />
          {!collapsed && <span>Product Return</span>}
        </Link>

        <Link
          to="/add-client"
          className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md ${isActive('/home')}`}
          onClick={() => setActive('/add-client')} 
        >
          <FaHome className="text-xl" />
          {!collapsed && <span>Add Client</span>}
        </Link>

        <Link
          to="/profile"
          className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md ${isActive('/profile')}`}
          onClick={() => setActive('/profile')} 
        >
            <FaUser className="text-xl" />
          {!collapsed && <span>Profile</span>}
          
        </Link>

        <Link
          to="/settings"
          className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md ${isActive('/settings')}`}
          onClick={() => setActive('/settings')}
        >
          <FaCog className="text-xl" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
