// src/components/UserDashboardProfile.js
import React from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {
    firstName: [],
    lastName: [],
    email: [],
    role: [],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <div className="text-center">
          <img loading="lazy"
            src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=0D8ABC&color=fff`}
            alt="User Avatar"
            className="w-24 h-24 mx-auto rounded-full shadow-lg mb-4"
          />
          <h1 className="text-2xl font-extrabold text-gray-800">{`${user.firstName} ${user.lastName}`}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="text-blue-600 font-medium">{user.role}</span>
          </div>

          <div className="flex justify-center gap-4">
            <Link to="/dashboard/user-order-history">
              <button className="mt-6  py-2 px-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300">
                Recent Order
              </button>
            </Link>
            <Link to="/cart">
              <button className="mt-6   py-2 px-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300">
                Your Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
