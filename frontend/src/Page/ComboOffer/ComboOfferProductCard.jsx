/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Swal from "sweetalert2";
import { UserContext } from "../dashboard/hook/UserContext";

const ComboOfferProductCard = ({ product }) => {
  const { user, productsInCart = [] } = useContext(UserContext); // Set default to empty array
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddToCart = async (product) => {
    // Check if the cart has reached its limit
    if (Array.isArray(productsInCart) && productsInCart.length >= 3) {
      Swal.fire({
        icon: "warning",
        title: "Cart Limit Reached",
        text: "You can only have up to 3 items in the cart.",
        confirmButtonText: "OK",
      });
      return; // Prevent adding to cart
    }

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to add items to your cart.",
        confirmButtonText: "OK",
      });
      return;
    }

    const email = user.email; // Use authenticated user's email
    const {
      _id: productId,
      name,
      colors,
      sizes,
      price,
      originalPrice,
    } = product;
    const quantity = 1; // Default quantity

    // Convert colors and sizes arrays to strings
    const colorString = JSON.stringify(colors); // or colors.join(',')
    const sizeString = JSON.stringify(sizes); // or sizes.join(',')

    try {
      const response = await axios.post(
        `${apiUrl}/api/combo-cart`,
        {
          email,
          productId,
          name,
          colors: colorString, // Send colors as a string
          sizes: sizeString, // Send sizes as a string
          price,
          originalPrice,
          quantity,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: "Your item has been successfully added to the cart!",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );

      // Check for specific error message about cart limit
      if (
        error.response?.data?.error ===
        "You can only have up to 3 items in the cart."
      ) {
        Swal.fire({
          icon: "warning",
          title: "Cart Limit Reached",
          text: error.response.data.error,
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error adding the item to the cart.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="lg:max-w-xs max-w-72 rounded-lg shadow-transparent border border-[#EAECF0] bg-white">
      {/* Discount Badge */}
      <div className="relative">
        <img loading="lazy"
          src={product.images[0]}
          alt="Cropped hoodie"
          className="rounded-t-lg w-full"
        />
        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
          - {product.discount}%
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Stock Info */}
        <div className="flex justify-between items-center mb-2">
          <span className="inline-block bg-[#E313261A] text-gray-800 text-[8px] lg:text-sm font-semibold px-2 py-1 rounded-full">
            {product.stockStatus}
          </span>

          {/* Price */}
          <div className="flex flex-col md:flex-row md:items-center text-right">
            <div className="text-lg font-bold text-gray-800 flex items-center justify-end">
              {product.price}
              <FaBangladeshiTakaSign className="ml-1 text-base md:text-lg" />
            </div>
            <div className="text-sm md:text-base text-gray-400 line-through flex items-center justify-end ml-0 md:ml-4">
              {product.originalPrice}
              <FaBangladeshiTakaSign className="ml-1 text-xs md:text-sm" />
            </div>
          </div>
        </div>

        {/* Product Title and Description */}
        <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>

        {/* Color and Size Options */}
        <div className="lg:flex justify-between items-center mb-3">
          <div className="flex items-center space-x-1">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${color} inline-block`}
              ></span>
            ))}
          </div>

          {/* Size Options */}
          <div className="text-sm md:text-base font-semibold text-gray-600">
            {product.sizes.join(" ")}
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={() => handleAddToCart(product)} // Pass the product to the function
          className="w-full text-xs md:text-base text-[#1D2939] hover:bg-[#E31326] hover:text-[#FFFFFF] font-semibold py-2 md:py-3 px-4 rounded-full border border-[#EAECF0] flex items-center justify-center space-x-2 duration-300"
        >
          <FaPlus className="text-base md:text-lg" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default ComboOfferProductCard;
