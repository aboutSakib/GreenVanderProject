/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Pagination from "../../shared/Pagination";
import ProductCard from "../../shared/ProductCard";
// import CategoryCheckbox from "./CategoryCheckbox"; // Import the checkbox component

const CategoryGrid = ({
  selectedSize,
  selectedColor,
  selectedSort,
  selectedPrice,
  selectedCategories,
}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/products/all-products`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/categories` // Replace with your actual category API endpoint
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const checkPriceRange = (productPrice, selectedPrice) => {
    if (!selectedPrice) return true; // No price filter applied

    const [min, max] = selectedPrice.split("-").map(Number);

    if (typeof productPrice === "number") {
      return productPrice >= min && productPrice <= max;
    } else {
      console.error(
        "Expected product.price to be a number but received:",
        productPrice
      );
      return false; // Handle unexpected type
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSize = selectedSize
      ? product.sizes.includes(selectedSize)
      : true;

    // Check if product.category is in the selectedCategories
    const matchesCategories = selectedCategories
      ? selectedCategories.includes(product.category)
      : true;

    const matchesColor = selectedColor
      ? product.colors.includes(selectedColor.toLowerCase())
      : true;

    const matchesPrices = checkPriceRange(product.price, selectedPrice);

    return matchesSize && matchesColor && matchesPrices && matchesCategories;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "Price: Low to High") {
      return a.price - b.price;
    } else if (selectedSort === "Price: High to Low") {
      return b.price - a.price;
    }
    return 0; // Default sorting (Best Match)
  });

  const offset = currentPage * itemsPerPage;
  const currentProducts = sortedProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div>
      <div className="py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </div>
  );
};

export default CategoryGrid;
