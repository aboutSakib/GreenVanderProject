import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="lg:max-w-xs max-w-72 rounded-lg shadow-md border border-[#EAECF0] bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Discount Badge */}
      <div className="relative">
        <Link to={"/products/" + product._id}>
          <img
            loading="lazy"
            src={apiUrl + "/" + product.images[0]}
            className="rounded-t-lg w-full md:h-[350px] sm:h-[250px] h-[200px] object-cover object-top"
          />
        </Link>
        <span className="absolute top-2 left-2 bg-green-800 text-white px-3 py-2 text-xs rounded-full">
          - {product.discount}%
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Stock Info */}
        <div className="flex justify-between items-center mb-2">
          <span className="inline-block bg-[#84d814] text-white text-[8px] lg:text-sm font-semibold px-3 py-1 rounded-full">
            {product.stockStatus}
          </span>

          {/* Price */}
          <div className="flex flex-col md:flex-row md:items-center text-right">
            <div className="text-base font-bold text-green-800 flex items-center justify-end">
              {product.price}
              <FaBangladeshiTakaSign className="text-sm md:text-base" />
            </div>
            <div className="text-sm md:text-base text-gray-400 line-through flex items-center justify-end ml-0 md:ml-1">
              {product.originalPrice}
              <FaBangladeshiTakaSign className="text-sm md:text-base" />
            </div>
          </div>
        </div>

        {/* Product Title and Description */}
        <Link to={"/products/" + product._id}>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Color and Size Options */}
        <div className="lg:flex justify-between items-center mb-3">
          {/* Color Options */}
          <div className="flex items-center space-x-1">
            {product.colors.map((color, index) => (
              <span
                key={index}
                style={{ backgroundColor: color }}
                className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${color} inline-block`}
              ></span>
            ))}
          </div>

          {/* Size Options */}
          <div className="text-sm md:text-base font-semibold text-gray-600">
            {product.sizes.join(" ")}
          </div>
        </div>

        {/* Buy Button */}
        <Link to={`/products/${product._id}`}>
          <button className="w-full text-xs md:text-base text-[#1D2939] py-2 md:py-3 px-4 rounded-full flex items-center justify-center space-x-2 bg-white hover:bg-green-600 hover:text-white transition-colors big-dotted-border shadow-md hover:shadow-lg">
            <PiShoppingCartSimpleLight className="text-base md:text-lg" />
            <span>এখনি কিনুন</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
