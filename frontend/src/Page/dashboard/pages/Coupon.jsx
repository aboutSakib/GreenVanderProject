import axios from "axios";
import React, { useEffect, useState } from "react";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [message, setMessage] = useState("");
  const [applyCode, setApplyCode] = useState("");
  const [applyMessage, setApplyMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch all coupons on component mount
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/coupons`);
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        `${apiUrl}/api/coupons/create`,
        {
          code,
          discount,
          expiresAt,
        }
      );
      setMessage(response.data.message);
      fetchCoupons();
      setCode("");
      setDiscount("");
      setExpiresAt("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create coupon");
      console.error("Coupon creation error:", error);
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/coupons/${id}`);
      setMessage(response.data.message);
      fetchCoupons();
    } catch (error) {
      setMessage("Failed to delete coupon");
      console.error("Coupon deletion error:", error);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/coupons/apply`,
        {
          code: applyCode,
        }
      );
      setApplyMessage(
        response.data.message + ` Discount: ${response.data.discount}%`
      );
    } catch (error) {
      setApplyMessage(
        error.response?.data?.message || "Failed to apply coupon"
      );
      console.error("Coupon application error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin Dashboard - Coupons
      </h1>

      {message && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          {message}
        </div>
      )}

      {/* Create Coupon Form */}
      <div className="bg-white p-6 shadow-md rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Coupon</h2>
        <form onSubmit={handleCreateCoupon} className="space-y-4">
          <div>
            <label className="block text-gray-700">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full p-2 border rounded"
              min="1"
              max="100"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Expires At</label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Coupon
          </button>
        </form>
      </div>

      {/* Coupon Application Form */}
      <div className="bg-white p-6 shadow-md rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={applyCode}
            onChange={(e) => setApplyCode(e.target.value)}
            placeholder="Enter coupon code"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </div>
        {applyMessage && <p className="mt-3 text-green-700">{applyMessage}</p>}
      </div>

      {/* List of All Coupons */}
      <div className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4">Current Coupons</h2>
        {coupons.length === 0 ? (
          <p className="text-gray-600">No coupons available.</p>
        ) : (
          <ul className="space-y-4">
            {coupons.map((coupon) => (
              <li
                key={coupon._id}
                className="flex items-center justify-between py-3 border-b"
              >
                <div>
                  <h3 className="text-lg font-medium">{coupon.code}</h3>
                  <p className="text-sm text-gray-600">
                    Discount: {coupon.discount}%
                  </p>
                  <p className="text-sm text-gray-600">
                    Expires At:{" "}
                    {new Date(coupon.expiresAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Coupon;
