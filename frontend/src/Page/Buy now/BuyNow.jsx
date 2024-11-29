import React, { useContext, useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bkashLogo from "../../Images/bkash.jpg";
import cardLogo from "../../Images/card.jpg";
import cashLogo from "../../Images/cash.jpg";
import nagadLogo from "../../Images/nagad.jpg";
import rocketLogo from "../../Images/rocket.jpg";
import { UserContext } from "../dashboard/hook/UserContext";

const BuyNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedColor, selectedSize, quantity, product } = location.state || {};
  const { user } = useContext(UserContext);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [couponCode, setCouponCode] = useState(""); // Coupon Code State
  const [discount, setDiscount] = useState(0); // Discount State
  const [deliveryCharge, setDeliveryCharge] = useState(130); // Discount State

  const apiUrl = import.meta.env.VITE_API_URL;
  // Calculate the total order amount before discount
  const totalOrder = product?.price * quantity;

  const payemntMethod = [
    { method: "Cash On Delivery", logo: cashLogo },
    { method: "Bkash", logo: bkashLogo },
    { method: "Nagad", logo: nagadLogo },
    { method: "Rocket", logo: rocketLogo },
    { method: "Credit/Debit Card", logo: cardLogo },
  ];

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  });

  // Apply the coupon
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
        headers: {
          "Content-Type": "application/json",
        },
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid coupon");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Coupon Error",
        text: error.message,
      });
    }
  };

  // Calculate the final total after applying the discount
  const finalTotal = totalOrder - (totalOrder * discount) / 100 + deliveryCharge;

  // Handle placing an order
  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone || !shippingAddress) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill out all required fields.",
      });
    }

    if (!paymentMethod) {
      return Swal.fire({
        icon: "warning",
        title: "Payment Method Required",
        text: "Please select a payment method.",
      });
    }

    const orderData = {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      products: [
        {
          productId: product._id,
          name: product.name,
          image: product.images[0],
          colors: selectedColor,
          sizes: selectedSize,
          quantity: quantity,
        },
      ],
      totalAmount: finalTotal,
      discountApplied: discount,
      paymentMethod,
      userId: user?._id || null,
      email: user?.email || null,
    };
    console.log(orderData);

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

      if (data.order._id) {
        const { order } = data;
        navigate("/order-confirm", { state: { order } });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Order creation failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleAddressChange = (e) => {
    const fieldValue = e.target.value;

    // Check if the address contains "Dhaka" (case insensitive)
    if (fieldValue.toLowerCase().includes("dhaka")) {
      setDeliveryCharge(60);
    } else {
      setDeliveryCharge(130);
    }
    setShippingAddress(fieldValue);
  };

  return (
    <>
      {product?._id && (
        <div className="min-h-screen bg-gray-100 p-6 md:p-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                  <input type="number" placeholder="Phone Number" className="w-full p-3 border rounded-lg" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                </div>
                <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
                <textarea placeholder="Address" rows="3" className="w-full p-3 border rounded-lg" value={shippingAddress} onChange={handleAddressChange} required></textarea>
              </form>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {payemntMethod.map(({ method, logo }) => (
                    <button
                      key={method}
                      type="button"
                      className={`p-4 border rounded-lg shadow-md flex items-center gap-2 transition-colors ${paymentMethod === method ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                      onClick={() => setPaymentMethod(method)}>
                      <img loading="lazy" src={logo} alt={method + "Logo"} className="w-10 h-10" />
                      <span className="font-medium">{method}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex gap-4 mb-4">
                <img loading="lazy" src={apiUrl + "/" + product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p>
                    Size: {selectedSize} | Color: {selectedColor}
                  </p>
                  <p>Qty: {quantity}</p>
                  <p className="flex">
                    {product.price} <FaBangladeshiTakaSign />
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p>Order Total: {totalOrder}₺</p>
                <p className="font-medium">
                  Discount: <span className="text-red-600">{discount}%</span>
                </p>
                <p className="font-medium">
                  Delivery Charge: <span className="text-black">{deliveryCharge} BDT</span>
                </p>
                <p className="font-bold">Final Total: {finalTotal}₺</p>
              </div>
              <button className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg" onClick={handlePlaceOrder}>
                Place Order
              </button>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
                <input type="text" placeholder="Enter coupon code" className="w-full p-3 border rounded-lg" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg" onClick={applyCoupon}>
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNow;
