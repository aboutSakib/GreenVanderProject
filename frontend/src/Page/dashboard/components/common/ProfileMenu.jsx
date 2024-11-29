import React, { useState } from "react";
import { Menu, MenuItem } from "@headlessui/react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal"; // Modal for displaying profile info
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdDashboardCustomize } from "react-icons/md";

const ProfileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false); // State for controlling modal visibility
  const navigate = useNavigate();

  const handleLogout = () => {
    // Confirm logout using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear localStorage and user state
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show logout success notification
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
          showConfirmButton: false,
          timer: 1500, // Auto-close after 1.5 seconds
        });

        // Navigate to login page after logout
        navigate("/login");
        window.location.reload();
      }
    });
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true); // Open the modal to show profile info
    setMenuOpen(false); // Close the menu
  };

  return (
    <div className="relative">
      {/* Profile Icon Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center justify-center text-3xl rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FaUserCircle />
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <Menu as="div" className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={handleProfileClick}
                >
                  <FiUser className="mr-2" /> Profile
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <Link
                  className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                    active ? "bg-gray-100" : ""
                  }`}
                  to={"/dashboard/profile"}
                >
                  <MdDashboardCustomize className="mr-2" /> Dashboard
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ active }) => (
                <button
                  className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={handleLogout}
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              )}
            </MenuItem>
          </Menu>
        </div>
      )}

      {/* Profile Modal */}
      {profileModalOpen && (
        <ProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileMenu;
