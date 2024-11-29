/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { FaBangladeshiTakaSign, FaPlus } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { UserContext } from "../dashboard/hook/UserContext";
const AddProductModalDetalis = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  // Define the query using useQuery
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id], // Unique cache key based on product ID
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/products/single-product/${id}`
      );
      return response.data; // Assuming response.data is the product object
    },
    enabled: !!id, // Only run the query if id is truthy
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const products = useLoaderData();
  console.log(products);

  const { user } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M"); // Default size
  const [selectedColor, setSelectedColor] = useState(products?.colors); // Default color based on the first color in the list
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const email = user.email;
    const {
      _id: productId,
      name,
      colors,
      sizes,
      price,
      originalPrice,
    } = products;

    // Convert arrays to comma-separated strings
    const formattedColors = colors.join(", ");
    const formattedSizes = sizes.join(", ");

    try {
      const response = await axios.post(`${apiUrl}/api/cart`, {
        email,
        productId,
        name,
        colors: selectedColor, // Use selected color
        sizes: selectedSize, // Use selected size
        price,
        originalPrice,
        quantity,
      });

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

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error adding the item to the cart.",
        confirmButtonText: "OK",
      });
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div>
        <div className="p-4">
          {/* Add Products Button */}
          <button
            onClick={openModal}
            className="w-full text-xs md:text-base text-[#1D2939] hover:bg-[#E31326] hover:text-[#FFFFFF] font-semibold py-2 md:py-2 px-2 rounded-full border border-[#EAECF0] flex items-center justify-center space-x-2 duration-300"
          >
            <FaPlus className="text-base md:text-lg" />
            <span>Add</span>
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-[1320px] h-auto max-h-[90vh] overflow-y-auto relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  &times;
                </button>

                {/* Modal Header */}
                <div className=" mx-auto px-4 py-6">
                  {/* Product Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 max-w-fit gap-12">
                    {/* Left side: Image Gallery */}
                    <>
                      {/* For large and extra-large devices */}
                      <div className="hidden xl:flex gap-6">
                        {/* Thumbnails */}
                        <div className="gap-2 space-y-6">
                          {products.images.slice(0, 3).map((image, index) => (
                            <img
                              loading="lazy"
                              key={index}
                              src={apiUrl + "/" + image}
                              alt={`Thumbnail ${index}`}
                              className={`h-28 w-28 rounded-md cursor-pointer ${
                                selectedImage === index
                                  ? "border-2 border-red-500"
                                  : ""
                              }`}
                              onClick={() => setSelectedImage(index)}
                            />
                          ))}
                          {/* Extra images indicator */}
                          <div className="h-28 w-28 flex items-center justify-center bg-gray-100 rounded-md text-gray-500">
                            +3
                          </div>
                        </div>
                        <div className="relative">
                          <img
                            loading="lazy"
                            src={apiUrl + "/" + products.images[selectedImage]}
                            alt="Selected Product"
                            className="w-[512px] h-[512px]  rounded-md"
                          />
                          {/* Discount badge */}
                          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                            -{products.discount}%
                          </span>
                        </div>
                      </div>

                      {/* For small and medium devices */}
                      <div className="xl:hidden">
                        <Swiper
                          pagination={{
                            dynamicBullets: true,
                          }}
                          modules={[Pagination]}
                          className="mySwiper"
                        >
                          {products.images.map((image, index) => (
                            <SwiperSlide key={index}>
                              <img
                                loading="lazy"
                                src={apiUrl + "/" + image}
                                alt={`Slide ${index}`}
                                className="sm:h-[342px] sm:w-[342px] md:h-[512px] md:w-[512px] object-cover rounded-md"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </>

                    {/* Right side: Product Details */}
                    <div className="space-y-6">
                      {/* Product Information */}

                      <div className="space-y-2">
                        <span className="inline-block bg-[#E313261A] text-gray-800 text-[8px] lg:text-sm font-semibold px-2 py-1 rounded-full">
                          {products.stockStatus}
                        </span>
                        <h1 className="lg:text-2xl text-lg font-bold">
                          {products.name}
                        </h1>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xl font-semibold text-[#101828]  flex items-center">
                            {products.price}
                            <FaBangladeshiTakaSign className="text-base font-semibold text-[#101828]  flex items-center" />
                          </span>
                          <span className="line-through text-gray-500 flex items-center">
                            {products.originalPrice} <FaBangladeshiTakaSign />
                          </span>
                        </div>
                        <p className="text-base font-medium text-gray-500">
                          SKU:{" "}
                          <span className="text-red-500">{products.sku}</span>
                        </p>
                      </div>
                      <hr />
                      {/* Sizes and Color */}
                      <div className="space-y-4">
                        {/* Sizes */}
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">Size:</span>
                          <div className="flex space-x-2">
                            {products.sizes.map((size) => (
                              <button
                                key={size}
                                className={`px-5 py-1 border rounded-full ${
                                  size === selectedSize
                                    ? "bg-red-500 text-white"
                                    : "bg-white border-gray-300"
                                }`}
                                onClick={() => setSelectedSize(size)}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color options */}
                        <div className=" items-center space-y-2">
                          <h1 className="text-gray-500">
                            Color:{" "}
                            <span className="font-normal uppercase text-[#101828]">
                              {selectedColor}
                            </span>
                          </h1>
                          <div className="flex space-x-2">
                            {products.colors.map((color) => (
                              <div
                                key={color}
                                className={`h-10 w-10 rounded-md border ${color} border-gray-300 cursor-pointer ${
                                  selectedColor === color
                                    ? "border-red-500"
                                    : ""
                                }`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <hr />
                      {/* Quantity and Add to Cart */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <h1 className="text-base font-normal text-gray-500">
                            Quantity:
                          </h1>
                          <div className="flex items-center border border-gray-300 rounded-full">
                            <button
                              onClick={() =>
                                setQuantity(quantity > 1 ? quantity - 1 : 1)
                              }
                              className="px-3 py-1 bg-gray-100 rounded-l-full"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="w-12 text-center border-none rounded-full"
                              value={quantity}
                              readOnly
                            />
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="px-3 py-1 bg-gray-100 rounded-r-full"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-red-500 text-base font-medium">
                            Few pieces left
                          </span>
                        </div>
                        <div></div>
                        <hr />
                        {/* Add to cart and Buy Now buttons */}
                        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                          {/* Add to cart button */}
                          <button
                            onClick={handleAddToCart}
                            className="xl:px-16 lg:px-14 px-10 py-3 bg-[#E31326] text-white rounded-full hover:bg-[#d11a21] transition"
                          >
                            Add to Cart
                          </button>
                          {/* Buy Now button */}
                          <button className="w-full text-xs md:text-base text-[#1D2939] py-2 md:py-3 px-4 rounded-full flex items-center justify-center space-x-2 bg-white hover:bg-green-600 hover:text-white transition-colors big-dotted-border shadow-md hover:shadow-lg">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold">Product Description</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                      {/* Left: Description */}
                      <p className="text-gray-600">{products.description}</p>
                      {/* Right: Bullet Points */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductModalDetalis;
