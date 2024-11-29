import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Loader from "../../Components/Ui/Loader";

// Fetch function using Axios
const fetchCarouselData = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data } = await axios.get(`${apiUrl}/api/banners/all-banners`, {
    params: { tansatacq: "active" }, // Example query parameter
  });

  // Ensure the data is correctly returned
  if (!Array.isArray(data)) {
    throw new Error("Data is not in the expected array format.");
  }
  return data;
};

const Carousel = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Use TanStack Query to fetch data
  const {
    data: carouselItems = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["carouselData"],
    queryFn: fetchCarouselData,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading || error) {
    return <Loader  isBorder={true}  error={error} extraErrorMessage="Couldnt load the banner." isLoading={isLoading} loadingText={"Banner is loading!"} />;
  }

  if (!carouselItems?.length) return <div>No items available</div>;
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      loop={true}
      pagination={{
        clickable: true,
        bulletClass: "banner-swiper-pagination-bullet",
        bulletActiveClass: "banner-swiper-pagination-bullet-active",
      }}
      autoplay={{
        delay: 3000, // Delay in milliseconds
        disableOnInteraction: false, // Autoplay won't stop after user interaction
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      id="bannerSwiper">
      {carouselItems?.map((item, index) => (
      
          <SwiperSlide key={item._id}>
            <img loading="lazy" src={apiUrl + "/" + item.imageUrl} alt={`Slide ${index + 1}`} className="w-full h-full block" />
          </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
