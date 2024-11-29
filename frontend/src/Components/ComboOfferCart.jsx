import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Page/dashboard/hook/UserContext";

const ComboOfferCart = () => {
  const { user } = useContext(UserContext);
  const [productsInCart, setProductsInCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for redirection
    const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchComboCart = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/combo-cart/${user.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart data: " + response.statusText);
        }

        const data = await response.json();
        setProductsInCart(data || []);
        setTotalAmount(
          data.reduce((acc, product) => acc + product.price, 0) || 0
        );
      } catch (err) {
        console.error("Error fetching combo cart:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComboCart();
  }, [user.email]);

  const handleRemoveProduct = async (productId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(
        `${apiUrl}/api/combo-cart/${user.email}/${productId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product: " + response.statusText);
      }

      const updatedCart = productsInCart.filter(
        (product) => product._id !== productId
      );
      setProductsInCart(updatedCart);
      setTotalAmount(
        updatedCart.reduce((total, product) => total + product.price, 0)
      );
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message);
    }
  };

  const handleCheckout = () => {
    if (productsInCart.length >= 3) {
      navigate("/checkout", { state: { cartItems: productsInCart, user } });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between w-full">
      <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start w-full">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide w-full">
          {productsInCart.length > 0 ? (
            productsInCart.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onRemove={handleRemoveProduct}
              />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="flex flex-col items-center lg:items-end w-full lg:w-auto">
          <p className="text-lg font-bold">{totalAmount} ৳</p>

          {productsInCart.length < 3 && (
            <p className="text-sm text-red-500">
              Add at least 3 items to proceed to checkout.
            </p>
          )}

          <button
            onClick={handleCheckout}
            className={`px-6 py-2 rounded-lg mt-2 w-full lg:w-auto ${
              productsInCart.length >= 3
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={productsInCart.length < 3}
          >
            Checkout ({productsInCart.length})
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onRemove }) => (
  <div className="border p-2 rounded-md flex items-center gap-2 min-w-[200px] w-[80%] sm:w-[250px] md:w-[220px]">
    <img loading="lazy"
      src={product.image}
      alt={product.name}
      className="w-12 h-12 object-cover rounded-md"
    />
    <div className="flex-1">
      <p className="text-xs font-semibold">{product.name}</p>
      <p className="text-xs">
        Size: {product.sizes} | Color: {product.colors}
      </p>
      <p className="text-sm font-semibold text-red-500">
        {product.price} ৳{" "}
        <span className="line-through text-gray-400 text-xs">
          {product.oldPrice} ৳
        </span>
      </p>
    </div>
    <button
      onClick={() => onRemove(product._id)}
      className="text-gray-500 hover:text-red-500"
      aria-label="Remove product"
    >
      ✕
    </button>
  </div>
);

export default ComboOfferCart;
