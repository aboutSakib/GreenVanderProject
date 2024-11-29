import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

const SidebarItemCollapse = ({ name, icon, subLinks }) => {
  const [open, setOpen] = useState(false);
  const currentPath = useLocation().pathname;

  useEffect(() => {
    subLinks.forEach((link) => {
      if (currentPath === link.url) {
        setOpen(true);
      }
    });
  }, [currentPath, subLinks]);

  return (
    <>
      {/* Parent Item */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full px-6 py-2 text-left hover:bg-gray-100 transition-colors"
      >
        <div className="text-xl text-gray-700 mr-3">{icon}</div>
        <span className="flex-grow text-gray-700">{name}</span>
        {open ? (
          <FiChevronUp className="text-gray-700" />
        ) : (
          <FiChevronDown className="text-gray-700" />
        )}
      </button>

      {/* Collapse Section */}
      {open && (
        <div className="ml-10 transition-all duration-300">
          {subLinks.map(({ name, url }, index) => (
            <NavLink
              to={url}
              key={index}
              className={({ isActive }) =>
                `block px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                  isActive ? "bg-gray-200 text-blue-500" : ""
                }`
              }
              end
            >
              <span className="relative pl-4 text-sm">
                {/* Custom Bullet */}
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></span>
                {name}
              </span>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarItemCollapse;
