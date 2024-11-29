import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      const response = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const results = await response.json();
      if (results.user._id) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You can now log in with your credentials.",
          showConfirmButton: true,
        }).then(() => navigate("/login"));
      } else {
        console.error("Signup failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-6">Sign Up</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
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
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-red-500 cursor-pointer hover:underline"
            onClick={handleSignInClick}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
