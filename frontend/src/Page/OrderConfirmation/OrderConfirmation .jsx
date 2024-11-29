 
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Images/logo/Frame.png";

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state || {};

  
  if (!order) {
    return <div className="text-center">No order found</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="bg-white p-6 w-full max-w-5xl">
        <div className="flex justify-center mb-4">
          <div className="rounded-full flex items-center justify-center">
            <img loading="lazy" src={logo} alt="Company Logo" />
          </div>
        </div>
        <h1 className="sm:text-5xl text-2xl font-bold text-center mb-2">Your order has been Confirmed!</h1>
        <p className="text-center mb-4">Thank you for your Order.</p>
        <div className="text-center">
          <Link to="/">
            <button className="bg-[#E31326] text-white py-2 px-6 mb-6 transition rounded-full duration-200">Continue Shopping</button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="bg-[#F9FAFB66] border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Order Status</h2>
            <p>
              Order number: <span className="font-medium">{order._id}</span>
            </p>
            <p>
              Date: <span className="font-medium">{order.createdAt}</span>
            </p>
            <p>
              Total: <span className="font-medium">{order.totalAmount}৳</span>
            </p>
            <p>
              Payment method: <span className="font-medium">{order.paymentMethod}</span>
            </p>
          </div>
          <div className="bg-[#F9FAFB66] border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Billing Address</h2>
            {/* Update these fields based on your order structure */}
            <p>
              <b>Name: </b>
              {order.customerName || "Name not available"}
            </p>
            <p>
              <b>Email: </b>
              {order.customerEmail || "Email not provided"}
            </p>
            <p>
              <b>Phone: </b>
              {order.customerPhone || "Phone not available"}
            </p>
            <p>
              <b>Address: </b>
              {order.shippingAddress || "Address not available"}
            </p>
          </div>
        </div>

        <div className="bg-[#F9FAFB66] border p-4 rounded-lg mt-6">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <p>
            Order: <span className="font-medium">{order.totalAmount}৳</span>
          </p>
          <p>
            Product discount: <span className="font-medium text-red-600">0৳</span>
          </p>
          <p>
            Coupon discount: <span className="font-medium text-red-600">0৳</span>
          </p>
          <h3 className="font-bold">
            Total order: <span className="font-medium">{order.totalAmount}৳</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
