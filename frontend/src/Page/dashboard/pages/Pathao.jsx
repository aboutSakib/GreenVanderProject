// src/components/PathaoOrderForm.js
import axios from "axios";
import React, { useState } from "react";

const PathaoOrderForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    store_id: "",
    merchant_order_id: "",
    recipient_name: "",
    recipient_phone: "",
    recipient_address: "",
    recipient_city: "",
    recipient_zone: "",
    recipient_area: "",
    delivery_type: "",
    item_type: "",
    special_instruction: "",
    item_quantity: "",
    item_weight: "",
    amount_to_collect: "",
    item_description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/pathao/create-order`,
        formData
      );
      setSuccess(response.data.message); // Show success message
      setError(""); // Clear error message
      setFormData({}); // Reset form after submission
    } catch (error) {
      console.error("Error submitting order:", error);
      setError("Failed to create order"); // Set error message
      setSuccess(""); // Clear success message
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Create Pathao Order</h2>

      {/* Error and Success Messages */}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="store_id"
          >
            Store ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="store_id"
            name="store_id"
            type="text"
            value={formData.store_id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="merchant_order_id"
          >
            Merchant Order ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="merchant_order_id"
            name="merchant_order_id"
            type="text"
            value={formData.merchant_order_id}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="recipient_name"
          >
            Recipient Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="recipient_name"
            name="recipient_name"
            type="text"
            value={formData.recipient_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="recipient_phone"
          >
            Recipient Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="recipient_phone"
            name="recipient_phone"
            type="tel"
            value={formData.recipient_phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="recipient_address"
          >
            Recipient Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="recipient_address"
            name="recipient_address"
            type="text"
            value={formData.recipient_address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="recipient_city"
          >
            Recipient City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="recipient_city"
            name="recipient_city"
            type="text"
            value={formData.recipient_city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="recipient_zone"
          >
            Recipient Zone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="recipient_zone"
            name="recipient_zone"
            type="text"
            value={formData.recipient_zone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="recipient_area"
          >
            Recipient Area
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="recipient_area"
            name="recipient_area"
            type="text"
            value={formData.recipient_area}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="delivery_type"
          >
            Delivery Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="delivery_type"
            name="delivery_type"
            type="text"
            value={formData.delivery_type}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="item_type"
          >
            Item Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="item_type"
            name="item_type"
            type="text"
            value={formData.item_type}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="special_instruction"
          >
            Special Instruction
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="special_instruction"
            name="special_instruction"
            type="text"
            value={formData.special_instruction}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="item_quantity"
          >
            Item Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="item_quantity"
            name="item_quantity"
            type="number"
            value={formData.item_quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="item_weight"
          >
            Item Weight (kg)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="item_weight"
            name="item_weight"
            type="number"
            step="0.01"
            value={formData.item_weight}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount_to_collect"
          >
            Amount to Collect (৳)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount_to_collect"
            name="amount_to_collect"
            type="number"
            value={formData.amount_to_collect}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="item_description"
          >
            Item Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="item_description"
            name="item_description"
            value={formData.item_description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit Order
        </button>
      </div>
    </form>
  );
};

export default PathaoOrderForm;
