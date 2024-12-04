import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bkashLogo from "../../Images/bkash.jpg";
import cardLogo from "../../Images/card.jpg";
import cashLogo from "../../Images/cash.jpg";
import nagadLogo from "../../Images/nagad.jpg";
import rocketLogo from "../../Images/rocket.jpg";
import { UserContext } from "../dashboard/hook/UserContext";

const BuyNowProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const products = location.state || [];
  const { user } = useContext(UserContext);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(130);

  const apiUrl = import.meta.env.VITE_API_URL;

  if (!products.length) {
    return (
      <div>
        <p>No Product Found</p>
        <Link to="/">Go To Home</Link>
      </div>
    );
  }

  const paymentMethods = [
    { method: "Cash On Delivery", logo: cashLogo },
    { method: "Bkash", logo: bkashLogo },
    { method: "Nagad", logo: nagadLogo },
    { method: "Rocket", logo: rocketLogo },
    { method: "Credit/Debit Card", logo: cardLogo },
  ];

  const applyCoupon = async () => {
    if (!couponCode) {
      return Swal.fire({
        icon: "warning",
        title: "No Coupon Code",
        text: "Please enter a coupon code.",
      });
    }

    try {
      const response = await fetch(`${apiUrl}/api/coupons/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });

      if (response.ok) {
        const data = await response.json();
        setDiscount(data.discount);
        Swal.fire({
          icon: "success",
          title: "Coupon Applied",
          text: `You've got a ${data.discount}% discount!`,
        });
      } else {
        throw new Error("Invalid coupon code.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Coupon Error",
        text: error.message,
      });
    }
  };

  const orderTotal = products.reduce(
    (total, product) => total + product.price,
    0
  );
  const discountedAmount = (discount / 100) * orderTotal;
  const finalTotal = orderTotal - discountedAmount + deliveryCharge;

  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone || !shippingAddress || !paymentMethod) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill out all required fields, including payment method.",
      });
    }

    const orderData = {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      products: products.map((product) => ({
        productId: product._id,
        name: product.name,
        image: product.images[0],
      })),
      totalAmount: finalTotal,
      discountApplied: discount,
      paymentMethod,
      userId: user?._id || null,
      email: user?.email || null,
    };

    try {
      const response = await fetch(`${apiUrl}/api/orders/add-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (data?.order?._id) {
        navigate("/order-confirm", { state: { order: data.order } });
      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              placeholder="Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full p-3 border rounded-lg"
            ></textarea>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">
                Select Payment Method
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentMethods.map((payment, index) => (
                  <div
                    key={index}
                    onClick={() => setPaymentMethod(payment.method)}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                      paymentMethod === payment.method
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={payment.logo}
                      alt={payment.method}
                      className="w-10 h-10 mr-3"
                    />
                    <span>{payment.method}</span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {products.map((product, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>{product.name}:</strong>
              </p>
              <p>
                <strong>Size:</strong> {product.size || "N/A"} |{" "}
                <strong>Color:</strong> {product.color || "N/A"}
              </p>
              <p>
                <strong>Qty:</strong> 1
              </p>
              <p>
                <strong>Price:</strong> {product.price} BDT
              </p>
            </div>
          ))}
          <p>
            <strong>Order Total:</strong> {orderTotal.toFixed(2)} BDT
          </p>
          <p>
            <strong>Discount:</strong> {discount.toFixed(2)}%
          </p>
          <p>
            <strong>Delivery Charge:</strong> {deliveryCharge.toFixed(2)} BDT
          </p>
          <p>
            <strong>Final Total:</strong> {finalTotal.toFixed(2)} BDT
          </p>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full p-3 border rounded-lg mb-2"
            />
            <button
              onClick={applyCoupon}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Apply Coupon
            </button>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowProducts;
