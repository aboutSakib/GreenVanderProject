import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate(); // Get the navigate function
    const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch product data from JSON server
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/products/all-products`
        ); // Make sure your JSON server is running
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter products based on search input
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(results);
  };
  const handleProductClick = (_id) => {
    navigate(`/products/${_id}`); // Navigate to the product page with the product ID
  };
  return (
    <div className="relative mx-auto">
      <div className="flex items-center">
        <FaSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-full w-32"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {searchTerm && (
        <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="p-2 border-b hover:bg-gray-100 cursor-pointer transition duration-200"
                onClick={() => handleProductClick(product._id)} // Navigate on click
              >
                {product.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
