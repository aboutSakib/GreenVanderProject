import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import ProductSkeleton from "../../../Components/Ui/ProductSkeleton";
import ViewAllButton from "../../../Components/Ui/ViewAllButton";
import Container from "../../../shared/Container";
import useAllProducts from "./UseAllProducts";

const AllProducts = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, loading, error] = useAllProducts();

  return (
    <div className="bg-[#193729] min-h-screen py-8">
      <Container>
        <h1 className="sm:text-2xl text-xl font-bold text-white">
          সমস্ত পণ্যসমূহ
        </h1>
        {loading && (
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
        {!loading && error && (
          <p className="text-center mt-2 text-red-600 block w-full">
            {error.message + `. Couldn't Load the products.`}
          </p>
        )}
        {!loading && !error && products.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <p className="text-xl text-gray-600 font-semibold text-center">
              Coming Soon
            </p>
          </div>
        )}
        {products && !loading && !error && (
          <>
            <div className="py-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {products?.map((product) => (
                <div key={product._id} className="py-4">
                  <div className="lg:max-w-sm max-w-72 rounded-lg shadow-md border border-[#EAECF0] bg-white hover:shadow-lg transition-shadow duration-300">
                    {/* Discount Badge */}
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
                        - {product.discount}%
                      </span>
                    </div>
                    {/* Product Info */}
                    <div className="p-4">
                      {/* Stock Info */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block bg-[#84d814] text-white text-[8px] lg:text-sm font-semibold px-3 py-1 rounded-full">
                          {product.stockStatus}
                        </span>

                        {/* Price */}
                        <div className="flex flex-col md:flex-row md:items-center text-right">
                          <div className="text-base font-bold text-green-800 flex items-center justify-end">
                            {product.price}
                            <FaBangladeshiTakaSign className=" text-base md:text-lg" />
                          </div>
                          <div className="text-sm md:text-base text-gray-400 line-through flex items-center justify-end ml-0 md:ml-2">
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
                              style={{ backgroundColor: color }}
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
                      <Link to={`/products/${product._id}`}>
                        <button className="w-full text-xs md:text-base text-[#1D2939] py-2 md:py-3 px-4 rounded-full flex items-center justify-center space-x-2 bg-white hover:bg-green-600 hover:text-white transition-colors big-dotted-border shadow-md hover:shadow-lg">
                          <PiShoppingCartSimpleLight className="text-base md:text-lg" />
                          <span>এখনি কিনুন</span>
                        </button>
                      </Link>
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

export default AllProducts;
