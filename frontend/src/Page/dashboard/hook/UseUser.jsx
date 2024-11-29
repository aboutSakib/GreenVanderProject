import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const UseUser = () => {
  const { user, loading } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data: isUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["isUser", user?.email],
    queryFn: async () => {
      if (!user) return false;
      const res = await axios.get(
        `${apiUrl}/api/user/${user.email}`
      );
      return res.data.admin;
    },
    enabled: !!user && !loading,
  });

  return [isUser, isUserLoading || loading];
};

export default UseUser;
