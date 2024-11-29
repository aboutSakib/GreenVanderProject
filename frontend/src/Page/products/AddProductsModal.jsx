import React, { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiPlusBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import useAllProducts from "../../home/components/AllProducts/UseAllProducts";
import AddProductModalDetalis from "./AddProductModalDetalis";

const AddProductsModal = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [AllProducts] = useAllProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Filter products based on selected category, size, and color
  const filteredProducts = AllProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.subcategory === selectedCategory;
    const matchesSize = !selectedSize || product.sizes.includes(selectedSize);
    const matchesColor =
      !selectedColor || product.colors.includes(selectedColor);
    return matchesCategory && matchesSize && matchesColor;
  });

  return (
    <div>
      <div className="p-4">
        {/* Add Products Button */}
        <button className="w-32 h-32 border border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 transition" onClick={openModal}>
          <span className="text-2xl">
            <PiPlusBold />
          </span>
          <span className="mt-2 text-sm">Add products</span>
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-[1320px] h-auto max-h-[90vh] overflow-y-auto relative">
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                &times;
              </button>

              {/* Modal Header */}
              <div className="flex justify-between py-2">
                <h2 className="text-2xl font-semibold">Add New Product</h2>
                <div className="flex space-x-4">
                  <button className="sm:px-6 px-3 text-sm py-2 bg-red-500 text-white rounded-full hover:bg-red-600" onClick={closeModal}>
                    Save
                  </button>
                  <button className="sm:px-6 px-3 text-sm py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
              <hr />

              {/* Category Filters */}
              <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 grid-cols-4 items-center mb-4 space-x-4 space-y-3">
                {["All", "Jacket", "Hoodie", "T-Shirt", "Pant", "Shirt"].map((subcategory) => (
                  <button
                    key={subcategory}
                    className={`px-3 py-2 rounded-full ${selectedCategory === subcategory ? "bg-red-600 text-white" : "text-gray-700 border border-gray-300"}`}
                    onClick={() => setSelectedCategory(subcategory)}>
                    {subcategory}
                  </button>
                ))}
              </div>

              {/* Size and Color Filters */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                    <option value="">Select size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="2XL">2XL</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                    <option value="">Select color</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                  </select>
                </div>
              </div>

              {/* Product Preview */}
              <div className="py-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="py-4">
                    <div className="lg:max-w-xs max-w-72 rounded-lg shadow-transparent border border-[#EAECF0] bg-white">
                      <div className="relative">
                        <img loading="lazy" src={apiUrl + "/" + product.images[0]} alt="Cropped hoodie" className="rounded-t-lg w-full md:h-[350px] sm:h-[250px] h-[200px] object-cover object-top" />
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">- {product.discount}%</span>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="inline-block bg-[#E313261A] text-gray-800 text-[8px] lg:text-sm font-semibold px-2 py-1 rounded-full">{product.stockStatus}</span>
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
                        <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <div className="lg:flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-1">
                            {product.colors.map((color, index) => (
                              <span style={{ backgroundColor: color }} key={index} className="w-4 h-4 md:w-5 md:h-5 rounded-full inline-block"></span>
                            ))}
                          </div>
                          <div className="text-sm md:text-base font-semibold text-gray-600">{product.sizes.join(" ")}</div>
                        </div>
                        <Link to={`/products/${product._id}`}>
                          <AddProductModalDetalis />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductsModal;
