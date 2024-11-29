import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import ProductSkeleton from "../../Components/Ui/ProductSkeleton";

const SimilarProduct = ({ product }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    data: similarProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "similarProducts",
      {
        category: product?.category || "",
        color: product?.color || "",
        size: product?.size || "",
      },
    ],
    queryFn: async () => {
      const query = new URLSearchParams();
      if (product?.category) query.append("category", product.category);
      if (product?.color) query.append("color", product.color);
      if (product?.size) query.append("size", product.size);

      const response = await axios.get(
        `${apiUrl}/api/products/all-products?${query}`
      );
      return response?.data?.products;
    },
  });

  return (
    <div className="my-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">অনুরূপ পণ্য</h1>

      {isLoading && !error && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
          {[...Array(5)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className="text-center mt-2 text-red-600">
          {error.message + `. Couldn't load the products.`}
        </p>
      )}

      {!isLoading && !error && similarProducts.length === 0 && (
        <div className="flex justify-center items-center py-8">
          <p className="text-xl text-gray-600 font-semibold">Coming Soon</p>
        </div>
      )}

      {!isLoading && !error && similarProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {similarProducts.map((product) => (
            <div
              key={product._id}
              className="max-w-xs rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="relative">
                <Link to={"/products/" + product._id}>
                  <img
                    loading="lazy"
                    src={apiUrl + "/" + product.images[0]}
                    alt={product.title}
                    className="rounded-t-lg w-full h-48 object-cover"
                  />
                </Link>
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Stock Info */}
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {product.stockStatus}
                  </span>

                  {/* Price Section */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-800 flex items-center justify-end">
                      {product.price}
                      <FaBangladeshiTakaSign className="ml-1 text-sm" />
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-400 line-through flex items-center justify-end">
                        {product.originalPrice}
                        <FaBangladeshiTakaSign className="ml-1 text-xs" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <Link to={"/products/" + product._id}>
                  <h3 className="text-base font-semibold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h3>
                </Link>

                {/* Options Section */}
                <div className="flex justify-between items-center mb-4">
                  {/* Colors */}
                  <div className="flex items-center space-x-1">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        style={{ backgroundColor: color }}
                        className="w-5 h-5 rounded-full border border-gray-300"
                      ></span>
                    ))}
                  </div>
                  {/* Sizes */}
                  <div className="text-sm text-gray-600 font-medium">
                    {product.sizes.join(", ")}
                  </div>
                </div>

                {/* Buy Button */}
                <Link to={`/products/${product._id}`}>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300">
                    <PiShoppingCartSimpleLight className="text-lg" />
                    <span>এখনি কিনুন</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarProduct;
