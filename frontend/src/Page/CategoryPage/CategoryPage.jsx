/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../shared/Pagination";
import ProductCard from "../../shared/ProductCard";

const CategoryPage = ({
  selectedSize,
  selectedColor,
  selectedSort,
  selectedPrice,
  selectedCategories,
}) => {
  const { category, subcategory } = useParams();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   
  const [categories, setCategories] = useState([]); // State for categories
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      if (!category || !subcategory) {
        console.error("Category or subcategory is undefined");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/all-products/category/${category}/subcategory/${subcategory}`
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
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
    fetchCategories();
    fetchProducts();
  }, [category, subcategory]);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
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
    </div>
  );
};

export default CategoryPage;
