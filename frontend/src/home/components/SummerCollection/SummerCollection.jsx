import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductSkeleton from "../../../Components/Ui/ProductSkeleton";
import ViewAllButton from "../../../Components/Ui/ViewAllButton";
import bgStyle from "../../../Images/bgStyle.png";
import Container from "../../../shared/Container";
import "./SummerCollection.css";

const SummerCollection = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
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

  return (
    <div className="py-8 Summer_Collection  ">
      <Container>
        <h1 className="text-2xl font-bold mb-6  text-white">ফ্রেশ সবজি</h1>

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="product-card relative shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute top-2 left-2 bg-green-700 text-white font-bold px-4 py-2 text-xs rounded">
                  -{item.discount || "11%"}
                </div>
                <img
                  loading="lazy"
                  src={`${apiUrl}/${item.images[0]}`}
                  alt={item.name}
                  className="rounded-t-lg w-full h-[200px] md:h-[250px] object-cover"
                />
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <Link to={`/products`}>
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full
                        bg-gray-300 hover:bg-[#01693a] transition-colors"
                      >
                        <FaShoppingBasket className="addCard cursor-pointer" />
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-lg font-bold text-green-800">
                      {item.price}৳
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {item.originalPrice}৳
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {products && !isLoading && !error && (
          <div className="flex justify-center mt-8">
            <ViewAllButton to="/products" />
          </div>
        )}
      </Container>
      <img className="stylebg" src={bgStyle} alt="" />
    </div>
  );
};

export default SummerCollection;
