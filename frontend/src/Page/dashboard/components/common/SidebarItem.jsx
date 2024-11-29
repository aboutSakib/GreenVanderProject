import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ name, icon, url }) => {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        `flex items-center px-6 py-2 transition-colors ${
          isActive ? "bg-gray-200 text-blue-500" : "text-gray-700"
        } hover:bg-gray-100`
      }
      end
    >
      <div className="mr-4 text-xl">{icon}</div>
      <span>{name}</span>
    </NavLink>
  );
};

export default SidebarItem;
