import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "", // Replace with your base URL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const setupInterceptors = () => {
      const requestInterceptor = axiosSecure.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("access-token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        }
      );

      const responseInterceptor = axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            navigate("/"); // Redirect to the home page
          }
          return Promise.reject(error);
        }
      );

      // Cleanup function
      return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
        axiosSecure.interceptors.response.eject(responseInterceptor);
      };
    };

    const cleanupInterceptors = setupInterceptors();

    // Cleanup when the component unmounts
    return () => {
      cleanupInterceptors();
    };
  }, [navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
