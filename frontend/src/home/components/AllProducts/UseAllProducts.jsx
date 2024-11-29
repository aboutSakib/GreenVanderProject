import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllProducts = () => {
  const apiUrl = import.meta.env.VITE_API_URL;


    const {
      data: allProduct = [],
      isLoading: loading,
      error,
    } = useQuery({
      queryKey: ["All products"],
      queryFn: async () => {
        const response = await axios.get(`${apiUrl}/api/products/all-products`);
        return response?.data?.products;
      },
    });


  return [allProduct, loading,error];
};

export default useAllProducts;
