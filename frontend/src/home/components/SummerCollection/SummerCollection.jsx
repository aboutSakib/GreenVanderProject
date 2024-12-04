import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import ProductSkeleton from "../../../Components/Ui/ProductSkeleton";
import ViewAllButton from "../../../Components/Ui/ViewAllButton";
import Container from "../../../shared/Container";
import "./SummerCollection.css";

const SummerCollection = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const categoryName = "ফ্রেশ সবজি";

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ফ্রেশ সবজি", "Categories"],
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/products/byCategory?categoryName=${categoryName}&page=1&limit=8`
      );
      return response?.data?.products;
    },
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleSelection = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, value),
    }));
  };

  const handleBuyNow = () => {
    const selectedDetails = products.filter((product) =>
      selectedProducts.includes(product._id)
    );
    navigate("/buy-now", { state: selectedDetails });
  };

  return (
    <div className="py-8 Summer_Collection bg-white min-h-screen">
      <Container>
        <h1 className="text-2xl font-bold mb-6 text-black">ফ্রেশ সবজি</h1>
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}
        {!isLoading && error && (
          <p className="text-center mt-2 text-red-600">
            {error.message + `. Couldn't Load the Summer collection.`}
          </p>
        )}
        {!isLoading && !error && products.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <p className="text-xl text-gray-600 font-semibold">Coming Soon</p>
          </div>
        )}
        {!isLoading && !error && products.length > 0 && (
          <>
            <div className="py-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {products?.map((product) => (
                <div key={product._id} className="py-4">
                  <div className="lg:max-w-sm max-w-72 rounded-lg shadow-md border border-[#EAECF0] bg-white hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <Link to={"/products/" + product._id}>
                        <img
                          loading="lazy"
                          src={apiUrl + "/" + product.images[0]}
                          alt={product.name}
                          className="rounded-t-lg w-full md:h-[350px] sm:h-[250px] h-[200px] object-cover object-top"
                        />
                      </Link>
                      <span className="absolute top-2 left-2 bg-green-800 text-white px-3 py-2 text-xs rounded">
                        - {product.discount || "11%"}
                      </span>
                      <input
                        type="checkbox"
                        className="absolute top-2 right-2 w-4 h-4"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleSelection(product._id)}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block bg-[#84d814] text-white text-[8px] lg:text-sm font-semibold px-3 py-1 rounded-full">
                          {product.stockStatus}
                        </span>
                        <div className="flex flex-col md:flex-row md:items-center text-right">
                          <div className="text-base font-bold text-green-800 flex items-center justify-end">
                            {product.price}
                            <FaBangladeshiTakaSign className="text-base md:text-lg" />
                          </div>
                          <div className="text-sm md:text-base text-gray-400 line-through flex items-center justify-end ml-0 md:ml-2">
                            {product.originalPrice}
                            <FaBangladeshiTakaSign className="ml-1 text-xs md:text-sm" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <input
                          type="number"
                          value={quantities[product._id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(product._id, +e.target.value)
                          }
                          className="w-16 text-center border rounded"
                          min="1"
                        />
                        <Link to={`/products/${product._id}`}>
                          <button className="text-xs md:text-base text-[#1D2939]  rounded-full px-3 py-2 flex items-center justify-center space-x-2 bg-white hover:bg-green-600 hover:text-white transition-colors big-dotted-border shadow-md hover:shadow-lg">
                            <PiShoppingCartSimpleLight className="text-base md:text-lg" />
                            <span> কিনুন</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="px-6 py-3 bg-green-600 text-white rounded shadow-lg hover:bg-green-700"
                onClick={handleBuyNow}
                disabled={selectedProducts.length === 0}
              >
                {selectedProducts.length > 1
                  ? "Proceed to Checkout"
                  : "Buy Now"}
              </button>
            </div>
          </>
        )}
        <div className="mt-4">
          <ViewAllButton />
        </div>
      </Container>
    </div>
  );
};

export default SummerCollection;
