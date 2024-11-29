import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Custom hook to fetch Flash Sale data
const useFlashSale = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data: categories = [], isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/api/categories/all-category`);
      return response.data;
    },
  });

  // Find the ID for "Mens" category
  const flashSellId = categories.find(
    (category) => category.name === "Flash Sell"
  )?._id;

  // Fetch products filtered by the "Mens" category ID
  const {
    data: flashSale = [],
    isLoading: productLoading,
    isError,
  } = useQuery({
    queryKey: ["products", flashSellId],
    queryFn: async () => {
      if (!flashSellId) return []; // Avoid fetching if category ID is not found
      const response = await axios.get(`${apiUrl}/api/products/all-products`);
      return response.data.products.filter(
        (product) => product.category === flashSellId
      );
    },
    enabled: !!flashSellId, // Only run the query if mensCategoryId is defined
  });

  return { flashSale, productLoading, isError, categoryLoading };
};

export default useFlashSale;
