import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComboOfferCart from "../../Components/ComboOfferCart";
import { UserContext } from "../../Page/dashboard/hook/UserContext"; // Context for user data

const ComboOfferHeader = () => {
  const { user } = useContext(UserContext); // Get user info from context
  const [productsInCart, setProductsInCart] = useState([]);
  const [flashOffer, setFlashOffer] = useState(null); // State to store flash offer data
  const [loading, setLoading] = useState(true); // Track loading state for cart products
  const [flashOfferLoading, setFlashOfferLoading] = useState(true); // Track loading state for flash offers
  const [error, setError] = useState(null); // Track errors
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch cart products based on user email
  useEffect(() => {
    if (user) {
      if (user.email) {
        fetchCartProducts(user.email);
      } else {
        setError("User email not found.");
        setLoading(false);
      }
    }
  }, [user]);

  // Fetch flash offers from the backend
  useEffect(() => {
    const fetchFlashOffer = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/flash-offer"
        );
        setFlashOffer(response.data[0]); // Assume we're using the first flash offer
      } catch (error) {
        console.error("Error fetching flash offers:", error);
        setError("Failed to fetch flash offers.");
      } finally {
        setFlashOfferLoading(false); // Stop loading
      }
    };

    fetchFlashOffer();
  }, []);

  // Fetch cart products
  const fetchCartProducts = async (email) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/combo-cart/${email}`
      );
      setProductsInCart(response.data);
    } catch (err) {
      console.error("Failed to fetch cart products:", err.message);
      setError("Failed to load cart products.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total amount of products in the cart
  const totalAmount = productsInCart.reduce(
    (acc, product) => acc + product.price,
    0
  );

  // Show loading indicator while fetching data
  if (loading || flashOfferLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-500 text-base">
          <Link to="/">Home</Link> /{" "}
          <span className="text-black font-semibold">Combo Offer ??</span>
        </div>

        <div className="lg:block hidden">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Sort by:</span>
            <button className="flex justify-between items-center w-2/3 md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm">
              Best Match
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-4">
        <h2 className="sm:text-3xl text-xl py-2 font-bold">Combo Offer ??</h2>
      </div>

      {/* Display flash offer if it's fetched */}
      <div className="text-center bg-gray-50 py-5">
        {flashOffer ? (
          <h2 className="sm:text-2xl text-base font-semibold text-[#475467] px-2">
            Buy any 3 products for{" "}
            <span className="text-[#E31326]">{flashOffer.name1} ৳</span> and get{" "}
            <span className="text-[#E31326]">{flashOffer.name2}</span> charge.
          </h2>
        ) : (
          <p>Flash offer is not available.</p>
        )}
      </div>

      <div className="p-6 bg-gray-100">
        <ComboOfferCart
          productsInCart={productsInCart}
          totalAmount={totalAmount}
          email={user.email} // Pass email to ComboOfferCart
        />
      </div>
    </div>
  );
};

export default ComboOfferHeader;
