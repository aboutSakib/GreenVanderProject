/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import Container from "../../shared/Container";
import AddProductsModal from "./AddProductsModal";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../../Components/Ui/Loader";
import { useCart } from "../../contexts/useContext";
import SimilarProduct from "./SimilarProduct";

const ProductsDetails = () => {
  const { id } = useParams();
  const { cart, syncCart } = useCart();
  // Define the query using useQuery
  const {
    data: product,
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

  const navigate = useNavigate(); // Initialize navigate

  // const { user } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]); // Default size
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]); // Default color based on the first color in the list
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedMeasurement, setSelectedMeasurement] = useState({
    ...product?.measurements,
  });

  const handleAddToCart = () => {
    setLoading(true); // Start loading
    const {
      _id: productId,
      name,
      colors,
      sizes,
      price,
      originalPrice,
      images,
      measurements,
    } = product;

    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem?.productId) {
      // update the properties of the existing item
      const updatedCart = cart.map((item) => {
        if (item.productId === existingItem.productId) {
          return {
            ...item,
            quantity,
            colors: selectedColor,
            sizes: selectedSize,
          };
        } else {
          return item;
        }
      });

      syncCart(updatedCart);
    } else {
      // add a new cart item
      const updatedCart = [
        ...cart,
        { productId, colors: selectedColor, sizes: selectedSize, quantity },
      ];
      syncCart(updatedCart);
    }

    Swal.fire({
      icon: "success",
      title: "Product added to cart!",
      text: "This product has been successfully added to cart.",
    });

    setLoading(false); // Stop loading
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const newMeasurements = product?.measurements.find(
      (measurement) => measurement.size == size
    )?.value;
    setSelectedMeasurement(newMeasurements);
  };

  const handleBuyNow = () => {
    navigate("/buy-now/" + product._id, {
      state: { selectedColor, selectedSize, quantity, product },
    });
  };

  useEffect(() => {
    if (product?._id) {
      const newMeasurements = product?.measurements?.find(
        (measurement) => measurement.size == selectedSize
      )?.value;
      setSelectedMeasurement(newMeasurements);
    }
  }, [selectedSize, product?._id, product?.measurements]);

  useEffect(() => {
    if (product?._id) {
      setSelectedColor(product?.colors[0]);
      setSelectedSize(product?.sizes[0]);
    }
  }, [product]);

  return (
    <Container>
      <div className=" mx-auto px-4 py-6">
        {isLoading && (
          <Loader
            isBorder={true}
            error={error}
            extraErrorMessage="Couldnt load the product."
            isLoading={isLoading}
            loadingText={"Product details is loading!"}
          />
        )}
        {error && error?.status !== 200 && (
          <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center flex-col">
            <p className="text-center mt-2 text-red-600">
              {error?.message}! Couldnt load the product.
            </p>
          </div>
        )}
        {product?._id && (
          <>
            {/* Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-fit gap-12">
              {/* Left side: Image Gallery */}
              <>
                {/* For large and extra-large devices */}
                <div className="hidden xl:flex gap-6">
                  {/* Thumbnails */}
                  <div className="gap-2 space-y-6">
                    {product?.images.slice(0, 5).map((image, index) => (
                      <img
                        loading="lazy"
                        key={index}
                        src={`${apiUrl}/${image}`} // Add server URL
                        alt={`Thumbnail ${index}`}
                        className={`h-28 w-28 rounded-md object-cover object-top cursor-pointer ${
                          selectedImage === index
                            ? "border-2 border-red-500"
                            : ""
                        }`}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                  <div className="relative">
                    <img
                      loading="lazy"
                      src={apiUrl + "/" + product?.images[selectedImage]}
                      alt="Selected Product"
                      className="w-[512px] h-[512px] rounded-md object-cover object-top"
                    />
                    {/* Discount badge */}
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                      -{product?.discount}%
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
                    {product?.images.map((image, index) => (
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
                  <span className="inline-block bg-[#84D814] text-white text-[8px] lg:text-sm font-semibold px-4 py-2 rounded-full">
                    {product?.stockStatus}
                  </span>
                  <h1 className="lg:text-2xl text-lg font-bold">
                    {product?.name}
                  </h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xl font-semibold text-green-800 flex items-center">
                      {product?.price}
                      <FaBangladeshiTakaSign className="text-base font-semibold text-[#101828] flex items-center" />
                    </span>
                    <span className="line-through text-gray-500 flex items-center">
                      {product?.originalPrice} <FaBangladeshiTakaSign />
                    </span>
                  </div>
                  <p className="text-base font-medium text-gray-500">
                    SKU:{" "}
                    <span className="text-red-500">{product?.sku || ""}</span>
                  </p>
                </div>
                {/* Description */}

                {/* Sizes and Color */}
                <div className="space-y-4">
                  {/* Sizes */}
                  {/* <div className="flex items-start gap-2 flex-col">
                    <div className="flex">
                      <p className="text-gray-500">
                        Size: <span className="font-medium text-black">{`${selectedSize} | Shoulder ${selectedMeasurement?.shoulder || ""}' | Chest ${selectedMeasurement?.chest || ""}'`}</span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {product?.sizes.map((size) => (
                        <button key={size} className={`px-5 py-1 border rounded-full ${size === selectedSize ? "bg-red-500 text-white" : "bg-white border-gray-300"}`} onClick={() => handleSizeSelect(size)}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div> */}

                  {/* Color options */}
                  {/* <div className="space-y-2">
                    <h1 className="text-gray-500">
                      Select Color : <span className="font-semibold uppercase text-[#101828]">{selectedColor}</span>
                    </h1>
                    <div className="flex gap-4">
                      {product?.colors.map((color) => (
                        <div
                          key={color}
                          className={`h-10 w-10 rounded-md border ${color} border-gray-300 cursor-pointer ${selectedColor === color ? "border-red-500" : ""}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div> */}
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
                  <div>
                    <AddProductsModal />
                  </div>
                  <hr />
                  {/* Add to cart and Buy Now buttons */}
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    {/* Add to cart button */}
                    <button
                      onClick={handleAddToCart}
                      className="xl:px-16 lg:px-14 px-10 py-3 bg-red-600 text-white rounded-full hover:bg-[#84D814] transition"
                    >
                      Add to Cart
                    </button>
                    {/* Buy Now button */}
                    <div
                      onClick={handleBuyNow}
                      className="cursor-pointer xl:px-16 lg:px-14 px-10 py-3 bg- border bg  text-white rounded-full bg-green-800 hover:bg-[#84D814] transition"
                    >
                      Buy Now
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold">Product Description</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                {/* Left: Description */}
                <p className="text-gray-600">{product?.description}</p>
                {/* Right: Bullet Points */}
              </div>
            </div>
            <SimilarProduct product={product} />
          </>
        )}
      </div>
    </Container>
  );
};

export default ProductsDetails;
