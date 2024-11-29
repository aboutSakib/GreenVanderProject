import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductSkeleton from "../../../Components/Ui/ProductSkeleton";
import ViewAllButton from "../../../Components/Ui/ViewAllButton";
import Container from "../../../shared/Container";
import "./WinterCollection.css";
const WinterCollection = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const categoryName = "ফ্রেশ ফলসমূহ";

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ফ্রেশ ফলসমূহ", "Categories"],
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/products/byCategory?categoryName=${categoryName}&page=1&limit=7`
      );
      return response?.data?.products;
    },
  });

  return (
    <div className="py-8 Winter_Collection bg-[#002a17]">
      <Container>
        <h1 className="text-2xl font-bold mb-6 text-white">ফ্রেশ ফলসমূহ</h1>
        {isLoading && (
          <>
            <div className="lg:flex gap-4 flex-wrap w-full hidden mt-5">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
            <div className="lg:hidden gap-4 flex-wrap w-full flex mt-5">
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          </>
        )}
        {!isLoading && error && (
          <p className="text-center mt-2 text-red-600 block w-full">
            {error.message + `. Couldn't Load the Winter collection.`}
          </p>
        )}
        {!isLoading && !error && products.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <p className="text-xl text-gray-600 font-semibold text-center">
              Coming Soon
            </p>
          </div>
        )}

        {products && !isLoading && !error && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8">
              {products.slice(0, 4).map((item) => (
                <div key={item._id} className="bg-white rounded-lg">
                  <Link to={"/products/" + item._id}>
                    <img
                      loading="lazy"
                      src={apiUrl + "/" + item.images[0]}
                      alt={item.name}
                      className="rounded-t-lg  w-full h-[200px] md:h-[250px] object-cover"
                    />
                  </Link>
                  <div className="px-4">
                    <div className="flex items-center justify-between">
                      <Link to={"/products/" + item._id}>
                        <h3 className="mt-3 text-sm font-semibold text-gray-800">
                          {item.name}
                        </h3>
                      </Link>
                      <Link to={`/products`}>
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-full mt-4
                        bg-gray-300 hover:bg-[#01693a] transition-colors"
                        >
                          <FaShoppingBasket className="addCard cursor-pointer" />
                        </div>
                      </Link>
                    </div>
                    <div className="flex items-center mt-2 space-x-2 pb-2">
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
              {products.slice(4, 8).map((item) => (
                <div key={item._id} className="bg-white rounded-lg">
                  <Link to={"/products/" + item._id}>
                    <img
                      loading="lazy"
                      src={apiUrl + "/" + item.images[0]}
                      alt={item.name}
                      className="rounded-lg w-full md:h-[350px] sm:h-[250px] h-[200px] object-cover"
                    />
                  </Link>
                  <div className="px-4">
                    <div className="flex items-center justify-between">
                      <Link to={"/products/" + item._id}>
                        <h3 className="text-sm font-semibold text-gray-800 mt-3">
                          {item.name}
                        </h3>
                      </Link>
                      <Link to={`/products`}>
                        <FaShoppingBasket className="mt-3 text-[#E31326] cursor-pointer" />
                      </Link>
                    </div>
                    <div className="flex items-center mt-2 space-x-2 pb-2">
                      <span className="text-lg font-bold text-gray-800">
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
            <div className="flex justify-center mt-8">
              <ViewAllButton to="/products" />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default WinterCollection;
