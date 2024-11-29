import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../Components/Ui/Loader";
import { useCart } from "../../contexts/useContext";
import Container from "../../shared/Container";
import { UserContext } from "../dashboard/hook/UserContext";
import { CartItem } from "./CartItem";

const Cart = () => {
  // const [localCartItems, setLocalCartItems] = useState(getCartFromLocalStorage() || []);
  const { cart, syncCart } = useCart();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    data: cartItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const localCartItemsIds = cart?.map((item) => item.productId);
      if (localCartItemsIds.length > 0) {
        const response = await axios.get(
          `${apiUrl}/api/products/by-ids?ids=${localCartItemsIds}`
        );
        return response?.data;
      } else {
        return [];
      }
    },
  });

  const handleQuantityChange = (id, newQuantity) => {
    // Check if product is already in the cart
    const existingItem = cart.find((item) => item.productId === id);

    if (existingItem?.productId) {
      // update the properties of the existing item
      const updatedCart = cart.map((item) => {
        if (item.productId === existingItem.productId) {
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      });

      syncCart(updatedCart);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Product not found in the cart!",
        text: "The product isnt found!",
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedLocalCartitems = cart.filter(
            (item) => item.productId != id
          );
          syncCart(updatedLocalCartitems);
          Swal.fire("Deleted!", "Your item has been removed.", "success");
        } catch (error) {
          console.error("Error deleting cart item:", error);
        }
      }
    });
  };

  const totalOrder = cart?.reduce((total, item) => {
    const cartItem = cartItems.find((it) => it._id == item.productId);
    return total + cartItem?.price * item?.quantity;
  }, 0);

  const couponDiscount = 0;

  if (isLoading) {
    return (
      <Loader
        isBorder={true}
        error={error}
        extraErrorMessage="Couldnt load the cart."
        isLoading={isLoading}
        loadingText={"Cart products is loading!"}
      />
    );
  }

  if (cart.length === 0) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center text-center flex-col gap-4">
        <p>No cart items to show</p>
        <Link
          to="/products"
          className="border rounded-md px-5 py-3 text-center"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Your Cart | Greenvander</title>
      </Helmet>
      <Container>
        <div className="mx-auto p-4 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {cart.map((item) => {
              const cartItem =
                cartItems.find((it) => it._id === item.productId) || {};
              return (
                <CartItem
                  cartItem={item}
                  key={item.productId}
                  quantity={item.quantity}
                  handleQuantityChange={handleQuantityChange}
                  product={cartItem}
                  onDelete={() => handleDelete(item.productId)}
                />
              );
            })}
          </div>

          <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="flex justify-between mb-2">
              <span>Order</span>
              <span>{totalOrder}₺</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Coupon discount</span>
              <span className="text-red-500">- {couponDiscount}₺</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total order</span>
              <span>{totalOrder - couponDiscount}₺</span>
            </div>

            <button
              onClick={() =>
                navigate("/checkout", {
                  state: { cartItems, user },
                })
              }
              className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
