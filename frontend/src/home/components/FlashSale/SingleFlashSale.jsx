import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import ProductSkeleton from "../../../Components/Ui/ProductSkeleton";
import ViewAllButton from "../../../Components/Ui/ViewAllButton";
import logo from "../../../Images/logo/⚡️.png";
import Container from "../../../shared/Container";
import FlashSaleTimer from "./FlashSaleTimer";

const SingleFlashSale = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const categoryName = "স্পেশাল অফার";

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["স্পেশাল অফার", "Categories"],
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/products/byCategory?categoryName=${categoryName}&page=1&limit=7`
      );
      return response?.data?.products;
    },
  });

  return (
    <div className="bg-white min-h-screen py-8">
      <Container>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="sm:text-3xl text-xl font-bold text-white">
              <span className="text-[#E31326]">স্পেশাল </span>
              <span className="ml-2 text-white">অফার</span>
            </h1>
            <img
              loading="lazy"
              src={logo}
              alt="flash_sale"
              className="sm:w-14 sm:h-16 w-12 h-14 sm:ml-3 ml-2"
            />
          </div>
          {products && !error && <FlashSaleTimer />}
        </div>

        {isLoading && (
          <div className="lg:flex gap-4 flex-wrap w-full mt-5">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        )}

        {!isLoading && error && (
          <p className="text-center mt-2 text-red-600">
            {error.message + `. Couldn't Load the products.`}
          </p>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <p className="text-xl text-gray-600 font-semibold">Coming Soon</p>
          </div>
        )}

        {products && !error && !isLoading && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 py-4">
              {products.slice(0, 5).map((product) => (
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
                      <span className="absolute top-2 left-2 bg-green-800 text-white px-3 py-1 text-xs rounded">
                        - {product.discount}%
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block bg-[#84d814] text-white text-[8px] lg:text-sm font-semibold px-2 py-1 rounded-full">
                          {product.stockStatus}
                        </span>

                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-800 flex items-center">
                            {product.price}
                            <FaBangladeshiTakaSign className="ml-1" />
                          </div>
                          <div className="text-sm text-gray-400 line-through flex items-center">
                            {product.originalPrice}
                            <FaBangladeshiTakaSign className="ml-1" />
                          </div>
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>

                      <div className="lg:flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-1">
                          {product.colors.map((color, index) => (
                            <span
                              key={index}
                              style={{ backgroundColor: color }}
                              className="w-4 h-4 md:w-5 md:h-5 rounded-full inline-block"
                            ></span>
                          ))}
                        </div>
                        <div className="text-sm font-semibold text-gray-600">
                          {product.sizes.join(" ")}
                        </div>
                      </div>

                      <Link to={`/products/${product._id}`}>
                        <button className="w-full text-xs md:text-base text-[#1D2939] py-2 md:py-3 px-4 rounded-full bg-white hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg">
                          <PiShoppingCartSimpleLight />
                          <span>এখনি কিনুন</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <ViewAllButton to="/flashsale-product" />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default SingleFlashSale;
