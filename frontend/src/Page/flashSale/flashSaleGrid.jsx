/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useFlashSale from "../../home/components/FlashSale/useFlasSale";
import Pagination from "../../shared/Pagination";
import ProductCard from "../../shared/ProductCard";
const FlashSaleGrid = ({
  selectedSize,
  selectedColor,
  selectedSort,
  selectedPrice,
  selectedCategories,
}) => {
  const { flashSale, productLoading, error, categoryLoading } = useFlashSale();
  const itemsPerPage = 16; // Adjust this based on your preference
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  // Logic to handle pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Determine the current products to show
  const offset = currentPage * itemsPerPage;
  const currentProducts = flashSale.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(flashSale.length / itemsPerPage);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const checkPriceRange = (productPrice, selectedPrice) => {
    if (!selectedPrice) return true;
    const [min, max] = selectedPrice.split("-").map(Number);
    return productPrice >= min && productPrice <= max;
  };

  const filteredProducts = flashSale.filter((product) => {
    const matchesSize = selectedSize
      ? product.sizes.includes(selectedSize)
      : true;
    const matchesCategories = selectedCategories
      ? selectedCategories.includes(product.category)
      : true;
    const matchesColor = selectedColor
      ? product.colors.includes(selectedColor.toLowerCase())
      : true;
    const matchesPrices = checkPriceRange(product.price, selectedPrice);

    return matchesSize && matchesCategories && matchesColor && matchesPrices;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "Price: Low to High") {
      return a.price - b.price;
    } else if (selectedSort === "Price: High to Low") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div>
      <div className="py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  xl:gap-4 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product._id} product={flashSale} />
          ))
        ) : (
          <p>No products available.</p> // Optional: message when there are no products
        )}
      </div>
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </div>
  );
};

export default FlashSaleGrid;
