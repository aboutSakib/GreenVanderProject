/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ProductSkeleton from "../../Components/Ui/ProductSkeleton";
import Pagination from "../../shared/Pagination";
import ProductCard from "../../shared/ProductCard";
// import CategoryCheckbox from "./CategoryCheckbox"; // Import the checkbox component

const ProductGrid = ({ selectedSize, selectedColor, selectedSort, selectedPrice, selectedCategories }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(0);
  const [productsData, setProductsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    fetchProducts(selected + 1);
  };

  const fetchProducts = async (page) => {
    setIsLoading(true);
    const queryString = `page=${page || 1}`;
    try {
      const response = await fetch(`${apiUrl}/api/products/all-products?${queryString}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setProducts(data.products);
      setProductsData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/categories/all-category` // Replace with your actual category API endpoint
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const checkPriceRange = (productPrice, selectedPrice) => {
    if (!selectedPrice) return true; // No price filter applied

    const [min, max] = selectedPrice.split("-").map(Number);

    if (typeof productPrice === "number") {
      return productPrice >= min && productPrice <= max;
    } else {
      console.error("Expected product.price to be a number but received:", productPrice);
      return false; // Handle unexpected type
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSize = selectedSize ? product.sizes.includes(selectedSize) : true;

    // Check if product.category is in the selectedCategories
    const matchesCategories = selectedCategories ? selectedCategories.includes(product.category) : true;

    const matchesColor = selectedColor ? product.colors.includes(selectedColor.toLowerCase()) : true;

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
      {!isLoading && products && (
        <div className="py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 gap-4">
          {products.length > 0 ? products.map((product) => <ProductCard key={product._id} product={product} />) : <p>No products available.</p>}
        </div>
      )}
      <Pagination pageCount={productsData.totalPages} handlePageClick={handlePageClick} />
    </div>
  );
};

export default ProductGrid;
