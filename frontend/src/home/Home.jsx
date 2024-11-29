import { Close } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import loadingGif from "../Images/UI/loading-gif.gif";
import Layout from "./components/Layout";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const modalBgRef = useRef();
  // const isLoading =  true

  // Fetch image data using TanStack Query
  const fetchImage = async () => {
    const response = await axios.get(
      `${apiUrl}/api/page-settings/get-settings`
    ); // Replace with your actual API endpoint
    return response.data; // Assuming the image URL is in the response data
  };

  // Update useQuery to use the new object-based argument format
  const {
    data: imageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pageSettings"],
    queryFn: fetchImage,
    // You can also add other options here if needed
  });

  useEffect(() => {
    if (imageData) {
      setIsModalOpen(true);
    }
  }, [imageData]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBgClick = (e) => {
    if (e.target === modalBgRef.current) {
      setIsModalOpen(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Home | GreenVander</title>
      </Helmet>
      <Layout />

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed sm:p-0 px-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          ref={modalBgRef}
          onClick={handleBgClick}
        >
          <div className="bg-white p-2 md:p-4 rounded-[12px] md:rounded-[32px] relative max-w-5xl w-full shadow-lg h-max flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute md:top-6 top-3 md:right-6 right-3 text-gray-500 hover:text-black text-xl md:text-3xl flex items-start"
            >
              <Close fontSize="1em" />
            </button>
            {isLoading && (
              <img
                loading="lazy"
                src={loadingGif}
                className="mx-auto block w-[25px]"
              />
            )}
            {error && <p>Error fetching image: {error.message}</p>}
            {imageData && (
              <img
                loading="lazy"
                src={apiUrl + "/" + imageData.popupImageUrl} // Adjust based on your API response structure
                alt="Exclusive Winter Collection"
                className="rounded-[8px] md:rounded-[16px] h-full w-full object-cover  border-[#e3132431] border"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
