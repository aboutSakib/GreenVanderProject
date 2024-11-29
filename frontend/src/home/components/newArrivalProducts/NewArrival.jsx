import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { PiArrowLeftThin, PiArrowRightThin } from "react-icons/pi";
import Container from "../../../shared/Container";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import ProductSkeleton from "../../../Components/Ui/ProductSkeleton";
import ViewAllButton from "../../../Components/Ui/ViewAllButton";

const NewArrival = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const categoryName = "নতুন পণ্যসমূহ";
  const prevButton = useRef();
  const nextButton = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const [slidesPerView, setSlidesPerView] = useState(1);

  const calculateCenterIndex = (index) => {
    // Calculate the center slide based on the number of visible slides
    return index + Math.floor(slidesPerView / 2);
  };

  // Fetch products filtered by the "New Arrivals" category
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "নতুন পণ্যসমূহ"],
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/new-arrival/all-new-arival-products`
      );
      return response?.data;
    },
    enabled: !!categoryName, // Only run the query if mensCategoryId is defined
  });

  useEffect(() => {
    // Listen to window resize to update slidesPerView based on screen width
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView(); // Initial check on mount
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  return (
    <div className="bg-[#002112] rounded-lg py-10">
      <Container>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#221F1C]">
            <span className="text-red-500">নতুন পণ্যসমূহ</span>
          </h2>
          <div className="flex gap-4">
            <button
              ref={prevButton}
              className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            >
              <PiArrowLeftThin className="text-gray-500 text-2xl" />
            </button>
            <button
              ref={nextButton}
              className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            >
              <PiArrowRightThin className="text-gray-500 text-2xl" />
            </button>
          </div>
        </div>

        {isLoading && !error && (
          <>
            <div className="lg:flex gap-4 flex-wrap w-full hidden">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
            <div className="lg:hidden gap-4 flex-wrap w-full flex">
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          </>
        )}
        {!isLoading && error && (
          <p className="text-center mt-2 text-red-600 block w-full">
            {error.message + `. Couldn't Load the new arrivals.`}
          </p>
        )}
        {!isLoading && !error && products.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <p className="text-xl text-gray-600 font-semibold">Coming Soon</p>
          </div>
        )}

        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          loop={true}
          autoplay={{
            delay: 3000, // Delay in milliseconds
            disableOnInteraction: false, // Autoplay won't stop after user interaction
          }}
          breakpoints={{
            // Mobile: 1 slide
            0: {
              slidesPerView: 1,
            },
            // Laptop: 2 slides
            768: {
              slidesPerView: 2,
            },
            // Desktop: 4 slides
            1024: {
              slidesPerView: 3,
            },
          }}
          onSlideChangeTransitionEnd={(swiper) =>
            setActiveIndex(swiper.realIndex)
          }
          navigation={{
            prevEl: prevButton.current,
            nextEl: nextButton.current,
          }}
          onBeforeInit={(swiper) => {
            // Initialize Swiper's navigation with custom button refs
            swiper.params.navigation.prevEl = prevButton.current;
            swiper.params.navigation.nextEl = nextButton.current;
          }}
          observer={true}
          observeParents={true}
          modules={[Navigation, Autoplay]}
          id="newArrivalsSwiper"
        >
          {products?.map((item, index) => (
            <SwiperSlide
              key={item._id}
              className={` transition-all h-full
                  ${
                    calculateCenterIndex(activeIndex) === index
                      ? "scale-110"
                      : ""
                  }
                `}
            >
              <img
                loading="lazy"
                src={apiUrl + "/" + item.imageUrl}
                className={`rounded-b-md shadow-lg object-cover mx-auto rounded-lg h-full w-full mt-5 transition-all
                  ${
                    calculateCenterIndex(activeIndex) === index
                      ? "scale-110"
                      : ""
                  }
                `}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <ViewAllButton to="/products" />
        </div>
      </Container>
    </div>
  );
};

export default NewArrival;
