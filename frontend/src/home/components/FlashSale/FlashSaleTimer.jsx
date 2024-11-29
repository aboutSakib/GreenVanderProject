import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Countdown from "react-countdown";

const fetchFlashSaleStatus = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await axios.get(`${apiUrl}/api/flash-sale`);
  return response.data; // Return the entire response as it contains status, countdown, etc.
};

const FlashSaleTimer = () => {
  const {
    data: flashSaleData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["flashSaleStatus"],
    queryFn: fetchFlashSaleStatus,
  });

  // Countdown renderer
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500 text-2xl">Sale Ended!</span>;
    } else {
      return (
        <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#74ff5e] rounded-full bg-[#001d0f] text-[#74ff5e] text-xl font-semibold">
          <div className="flex items-center space-x-3">
            <span className="text-2xl text-[#74ff5e]">⚡</span>
            <div className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-10 h-10 bg-transparent">
                {days.toString().padStart(2, "0")}d
              </span>
              <span className="text-white">:</span>
              <span className="flex items-center justify-center w-10 h-10 bg-transparent">
                {hours.toString().padStart(2, "0")}h
              </span>
              <span className="text-white">:</span>
              <span className="flex items-center justify-center w-10 h-10 bg-transparent">
                {minutes.toString().padStart(2, "0")}m
              </span>
              <span className="text-white">:</span>
              <span className="flex items-center justify-center w-10 h-10 bg-transparent">
                {seconds.toString().padStart(2, "0")}s
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  if (isLoading) return <p>Loading Flash sale time...</p>;
  if (isError) return <p>Error fetching flash sale time</p>;

  // Handle each flash sale status
  if (flashSaleData?.status === "upcoming") {
    return (
      <div>
        <p className="text-green-500 text-xl">
          Upcoming Sale: Starts in {flashSaleData.starts_in}
        </p>
        <Countdown
          date={Date.now() + flashSaleData.countdown}
          renderer={renderer}
        />
      </div>
    );
  }

  if (flashSaleData?.status === "ongoing") {
    return (
      <div>
        <p className="text-white text-xl">
          Flash Sale is Live! Ends in {flashSaleData.ends_in}
        </p>
        <Countdown
          date={Date.now() + flashSaleData.countdown}
          renderer={renderer}
        />
      </div>
    );
  }

  if (flashSaleData?.status === "ended") {
    return <p className="text-red-500 text-xl">Flash Sale has ended!</p>;
  }

  return null; // Default case
};

export default FlashSaleTimer;
