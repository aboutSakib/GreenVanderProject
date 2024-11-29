import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

const SingleProduct = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  const { category, image, price, instock, product_name, short_description } =
    product;

  return (
    <div className="pt-20 pb-5 px-4">
      <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Product Image */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <img
              loading="lazy"
              src={image}
              alt={product_name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Information */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold">{product_name}</h3>
            <h4 className="text-xl my-2">
              <span className="line-through text-gray-500 text-sm">$1829</span>{" "}
              ${price}
            </h4>

            <div className="flex items-center gap-4 my-2">
              <p className="text-sm">284 customer reviews</p>
              {/* Random rating value */}
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      index < Math.round(Math.random() * 5)
                        ? "currentColor"
                        : "none"
                    }
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                ))}
              </div>
            </div>

            <p className="text-sm my-4">{short_description}</p>

            <div className="flex items-center gap-4 my-2">
              <p className="text-sm font-medium">Category:</p>
              <span className="px-3 py-1 bg-blue-100 text-blue-500 rounded-full">
                {category}
              </span>
            </div>

            <div className="flex items-center gap-4 my-2">
              <p className="text-sm font-medium">Availability:</p>
              <span
                className={`px-3 py-1 rounded-full ${
                  instock
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {instock ? "In stock" : "Out Of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
