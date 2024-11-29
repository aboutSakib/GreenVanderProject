/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const Login = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  // Check if we are in development mode
  const isDevelopment = import.meta.env.MODE === "development";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok && result.user._id) {
        navigate("/");
        window.location.reload();
        const user = JSON.stringify(result.user);
        localStorage.setItem("user", user);
        localStorage.setItem("token", result.token);

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Login successful! ${result.user.firstName}`,
        });
      } else {
        console.error("Login failed");

        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Login failed!",
        });
      }
    } catch (err) {
      console.error(err.message);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200" onClick={handleSubmit}>
            Login
          </button>
        </form>

        {isDevelopment && <p>Email : admin@test.com <br /> Password : password123</p>}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <span className="text-red-500 cursor-pointer hover:underline" onClick={handleSignUpClick}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
