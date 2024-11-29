import React from "react";

const Password = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Password Reset</h2>
      <p className="text-sm text-gray-600 mb-4">Update your password here</p>
      <hr className="mb-6" />
      <div className="space-y-4">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter your old password
          </label>
          <input
            type="password"
            defaultValue="124bkf#4Ef"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            defaultValue="124bkf#4Ef"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm password
          </label>
          <input
            type="password"
            defaultValue="124bkf#4Ef"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Password;
