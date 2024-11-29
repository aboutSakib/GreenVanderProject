import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const UseAdmin = () => {
  const { user } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    data: isAdmin,
    isLoading: isAdminLoading,
    isError,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      if (!user?.email) return false;

      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token"); // Adjust the key if necessary

        const res = await axios.get(
          `${apiUrl}/api/users/admin/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data.admin;
      } catch (error) {
        console.error("Error fetching admin status:", error);
        return false; // Return false if there's an error
      }
    },
    enabled: !!user?.email, // Only run query if email is available
  });

  return [isAdmin, isAdminLoading, isError];
};

export default UseAdmin;
