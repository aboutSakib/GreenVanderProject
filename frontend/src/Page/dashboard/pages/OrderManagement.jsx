/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Loader from "../../../Components/Ui/Loader";
import Pagination from "../../../shared/Pagination";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // For filtering orders by status
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null); // For displaying order details
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const apiUrl = import.meta.env.VITE_API_URL;
  const modalBgRef = useRef();

  const {
    data: fetchedOrders = [],
    isLoading: loading,
    error: fetchError,
  } = useQuery({
    queryKey: ["orders", page],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/api/orders/all-orders?page=${page}`);
      return response?.data;
    },
  });

  // Fetch all orders when the component loads
  useEffect(() => {
    const fetchOrders = () => {
      setOrders(fetchedOrders.orders);
      setFilteredOrders(fetchedOrders.orders);
    };
    fetchOrders();
  }, [fetchedOrders]);

  // Handle status update for an order
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${apiUrl}/api/orders/update-order/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const updatedOrders = orders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order));
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders); // Also update the filtered orders list
    } catch (error) {
      setError("Failed to update status");
    }
  };

  // Handle filtering orders by status
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    if (selectedStatus === "") {
      setFilteredOrders(orders); // Show all orders if no status is selected
    } else {
      const filtered = orders.filter((order) => order.status === selectedStatus);
      setFilteredOrders(filtered);
    }
  };

  // Show modal with selected order's product details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  const handleBgClick = (e) => {
    if (e.target === modalBgRef.current) {
      setShowModal(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold mb-6 mt-8 text-center">Order History</h1>
        {loading || (fetchError && <Loader isBorder={false} error={fetchError} extraErrorMessage="Couldnt load the orders!" isLoading={loading} loadingText={"Orders are loading!"} />)}

        {orders?.length > 0 && (
          <>
            {/* Status Filter Dropdown */}
            <div className="mb-6 flex justify-end">
              <select value={statusFilter} onChange={handleFilterChange} className="py-2 px-4 border border-gray-300 rounded">
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirm">Confirm</option>
                <option value="Payment">Payment</option>
                <option value="shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Return">Return</option>
              </select>
            </div>

            <div className="w-full overflow-x-auto">
              {/* Display Orders */}
              <table className="w-full max-w-full min-w-[400px] bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order ID</th>
                    <th className="py-3 px-6 text-left">Customer Name</th>
                    <th className="py-3 px-6 text-left">Customer Email</th>
                    <th className="py-3 px-6 text-left">Customer Phone</th>
                    <th className="py-3 px-6 text-left">Shipping Address</th>
                    <th className="py-3 px-6 text-left">Total Amount</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {filteredOrders?.map((order) => (
                    <tr key={order._id} className="border-b border-gray-200">
                      <td className="py-3 px-6 text-left flex flex-wrap flex-col gap-2">
                        {order._id}
                        <button onClick={() => handleViewOrder(order)} className="py-1 px-3 bg-blue-500 text-white rounded">
                          View
                        </button>
                      </td>
                      <td className="py-3 px-6 text-left">{order.customerName}</td>
                      <td className="py-3 px-6 text-left">{order.customerEmail}</td>
                      <td className="py-3 px-6 text-left">{order.customerPhone}</td>
                      <td className="py-3 px-6 text-left">{order.shippingAddress}</td>
                      <td className="py-3 px-6 text-left flex items-center">
                        <FaBangladeshiTakaSign />
                        {order.totalAmount}
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span className={`${order.status === "Pending" ? "bg-yellow-500" : order.status === "shipped" ? "bg-blue-500" : "bg-green-500"} text-white py-1 px-3 rounded-full text-xs`}>{order.status}</span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <select className="py-1 px-2 border border-gray-300 rounded" value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                          <option value="Pending">Pending</option>
                          <option value="Confirm">Confirm</option>
                          <option value="Payment">Payment</option>
                          <option value="shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Return">Return</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <Pagination pageCount={fetchedOrders?.totalPages || 1} handlePageClick={handlePageClick} />

        {/* Modal for Order Product Details */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center" ref={modalBgRef} onClick={handleBgClick}>
            <div className="bg-white rounded-lg p-6 w-1/2 max-w-3xl h-max max-h-[500px] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>

              {/* Ordered Products */}
              <ul className="mb-4 space-y-4">
                {selectedOrder.products.map((product, index) => (
                  <li key={index} className="mb-2 flex flex-col md:flex-row items-center">
                    {/* Product Image */}
                    <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-6">
                      <img loading="lazy" src={apiUrl + "/" + product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
                    </div>

                    {/* Product Details */}
                    <div className="w-full md:w-3/4">
                      <p>
                        <strong>Product ID:</strong> {product.productId}
                      </p>
                      <p>
                        <strong>Product Name:</strong> {product.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                      <p>
                        <strong>Colors:</strong> <span>{product.colors.join(", ")}</span> {/* Join array of colors */}
                      </p>
                      <p>
                        <strong>Sizes:</strong> <span>{product.sizes.join(", ")}</span> {/* Join array of sizes */}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Close Button */}
              <div className="flex justify-end">
                <button onClick={handleCloseModal} className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderManagement;
