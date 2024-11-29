import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Page/dashboard/hook/UserContext";

const useOrder = () => {
  const { user } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    refetch,
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", user?._id], // Assuming user.id is available
    queryFn: async () => {
      // const response = await fetch(`${apiUrl}/api/orders/all-orders/${user?._id}`);
        const { data } = await axios.get(`${apiUrl}/api/orders/all-orders/${user?._id}`, {
          params: { tansatacq: "active" }, // Example query parameter
        });
      return data;
    },
    enabled: !!user?._id, // Ensure the query only runs if user.id is defined
  });

  return { orders, refetch, loading: isLoading, error };
};

export default useOrder;
