import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { PiArrowLeftThin, PiArrowRightThin } from "react-icons/pi";
import { Link } from "react-router-dom";
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

const HorizontalCarousel = () => {
  const prevButton = useRef();
  const nextButton = useRef();
  const apiUrl = import.meta.env.VITE_API_URL;
  const categoryName = "ফ্রেশ সবজি";

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "ফ্রেশ সবজি"],
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/products/byCategory?categoryName=${categoryName}&page=1&limit=9`
      );
      return response?.data?.products;
    },
    enabled: !!categoryName,
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="md:block hidden">
          <div className="flex flex-col w-full">
            {/* Title Section */}
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-[#221F1C]">
                <span className="text-[#E31326]">সবজিসমূহ</span>
              </h2>
            </div>

            {/* Products Carousel */}
            <div className="relative">
              {isLoading && !error && (
                <div className="lg:flex gap-4 flex-wrap w-full hidden">
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                </div>
              )}
              {!isLoading && error && (
                <p className="text-center mt-2 text-red-600 block w-full">
                  {error.message + `. Couldn't Load the products.`}
                </p>
              )}
              {!isLoading && !error && products.length === 0 && (
                <div className="flex justify-center items-center py-8">
                  <p className="text-xl text-gray-600 font-semibold">
                    Coming Soon
                  </p>
                </div>
              )}

              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: prevButton.current,
                  nextEl: nextButton.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevButton.current;
                  swiper.params.navigation.nextEl = nextButton.current;
                }}
                observer={true}
                observeParents={true}
                modules={[Navigation, Autoplay]}
                id="productSwiper"
              >
                {products?.map((item) => (
                  <SwiperSlide key={item._id} className="flex justify-center">
                    <Link
                      to={"/products/" + item._id}
                      className="bg-white rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 ease-in-out w-full max-w-[250px] p-4"
                    >
                      <img
                        loading="lazy"
                        src={apiUrl + "/" + item.images[0]}
                        className="rounded-lg w-full h-[200px] object-cover"
                        alt={item.name}
                      />
                      <p className="mt-2 text-center font-semibold text-[#221F1C] text-xl">
                        {item.name}
                      </p>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="h-8 border border-gray-300 rounded-full px-5 hover:bg-gray-100 transition-colors"
                ref={prevButton}
              >
                <PiArrowLeftThin className="text-gray-500 text-2xl" />
              </button>
              <button
                className="h-8 border border-gray-300 rounded-full px-5 hover:bg-gray-100 transition-colors"
                ref={nextButton}
              >
                <PiArrowRightThin className="text-gray-500 text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories grid for mobile devices */}
        <div className="block md:hidden">
          <div className="p-4">
            {/* Title Section */}
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">
                <span className="text-red-500">সবজিসমূহ</span>
              </h2>
            </div>
            {isLoading && !error && (
              <div className="flex gap-4 flex-wrap w-full">
                <ProductSkeleton />
                <ProductSkeleton />
              </div>
            )}
            {!isLoading && error && (
              <p className="text-center mt-2 text-red-600 block w-full">
                {error.message + `. Couldn't Load the products.`}
              </p>
            )}
            {!isLoading && !error && products.length === 0 && (
              <div className="flex justify-center items-center py-8">
                <p className="text-xl text-gray-600 font-semibold">
                  Coming Soon
                </p>
              </div>
            )}

            {/* Grid Section */}
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
              {products?.slice(0, 6).map((product) => (
                <Link
                  to={`/products/${product._id}`}
                  key={product._id}
                  className="bg-white rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center"
                >
                  <img
                    loading="lazy"
                    src={apiUrl + "/" + product.images[0]}
                    alt={product.name}
                    className="rounded-t-lg w-full h-[200px] object-cover"
                  />
                  <p className="text-center font-semibold text-[#221F1C] text-[15px] py-2 px-2">
                    {product.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HorizontalCarousel;
