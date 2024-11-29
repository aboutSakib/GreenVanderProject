import { BiTrash } from "react-icons/bi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const CartItem = ({ product, cartItem, quantity, handleQuantityChange, onDelete }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // const handleQuantityChange = async (id = product._id, newQuantity) => {
  //   // Check if product is already in the cart
  //   const itemIndex = localCartitems.findIndex((item) => item.productId === id);

  //   if (itemIndex > -1) {
  //     // Update properties if item exists
  //     localCartitems[itemIndex] = {
  //       ...localCartitems[itemIndex],
  //       quantity: newQuantity,
  //     };
  //   } else {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Product not found in the cart!",
  //       text: "The product isnt found!",
  //     });
  //   }
  //   // Save updated cart to localStorage
  //   setCartToLocalStorage(localCartitems);
  //   setQuantity(newQuantity);
  // };
  if (!product._id) {
    return <p>product not found!</p>;
  }
  return (
    product._id && (
      <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-[#F9FAFB66]">
        <Link to={"/products/" + product._id}>
          <img loading="lazy" src={apiUrl + "/" + product?.images[0]} alt={product.name} className="w-auto sm:h-48 h-20 rounded-lg object-cover" />
        </Link>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <Link to={"/products/" + product._id}>
              <h2 className="text-base sm:text-lg font-semibold">
                {product.name} | {cartItem.sizes}
              </h2>
            </Link>
            <button className="text-red-500" onClick={onDelete}>
              <BiTrash size={24} />
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-500">
            Color: {cartItem.colors} | Size: {cartItem.sizes}
          </p>
          <div className="mt-2">
            <span className="text-base sm:text-lg font-semibold flex items-center">
              {product.price}
              <FaBangladeshiTakaSign />
            </span>
            <span className="ml-2 text-sm sm:text-base text-gray-400 line-through flex items-center">
              {product.originalPrice}
              <FaBangladeshiTakaSign />
            </span>
          </div>
          <div className="flex justify-between mt-4 sm:mt-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-sm sm:text-base font-normal text-gray-500">Quantity :</h1>
              <div className="flex items-center border border-gray-300 rounded-full ">
                <button onClick={() => handleQuantityChange(product._id, quantity > 1 ? quantity - 1 : 1)} className="px-3 py-1 bg-gray-100 rounded-l-full text-sm sm:text-base">
                  -
                </button>
                <input type="text" className="w-12 text-center border-none rounded-full text-sm sm:text-base" value={quantity} readOnly />
                <button onClick={() => handleQuantityChange(product._id, quantity + 1)} className="px-3 py-1 bg-gray-100 rounded-r-full text-sm sm:text-base">
                  +
                </button>
              </div>
            </div>
            <div>
              <div className="text-sm sm:text-base font-semibold flex">
                Order Total:{" "}
                <div className="">
                  <h1 className="px-2 text-sm sm:text-base flex items-center">
                    {product.price * quantity}
                    <FaBangladeshiTakaSign />
                  </h1>
                  <span className="ml-2 text-sm sm:text-base text-gray-400 line-through flex items-center">
                    {product.originalPrice * quantity}
                    <FaBangladeshiTakaSign />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
