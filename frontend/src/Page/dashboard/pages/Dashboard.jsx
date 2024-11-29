import axios from "axios";
import React, { useEffect, useState } from "react";

const DashboardMain = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch orders data
    async function fetchOrders() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/orders/all-orders`
        );
        const orders = response.data;

        // Calculate total amount and quantity
        const amount = orders.reduce(
          (acc, order) => acc + order.totalAmount,
          0
        );
        const quantity = orders.reduce(
          (acc, order) =>
            acc +
            order.products.reduce((sum, product) => sum + product.quantity, 0),
          0
        );

        setTotalAmount(amount);
        setTotalQuantity(quantity);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Dashboard Main
        </h1>
        <p className="text-lg text-gray-600">
          This is the main dashboard page.
        </p>

        <div className="mt-6">
          <div className="p-4 border rounded-lg bg-blue-100">
            <p className="text-gray-700 font-semibold">Total Order Amount:</p>
            <p className="text-xl font-bold text-blue-700">৳{totalAmount}</p>
          </div>

          <div className="p-4 mt-4 border rounded-lg bg-green-100">
            <p className="text-gray-700 font-semibold">Total Quantity:</p>
            <p className="text-xl font-bold text-green-700">{totalQuantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
