// CartContext.js
import { createContext, useState } from "react";
import { getCartFromLocalStorage, setCartToLocalStorage } from "../utils/cartUtils";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getCartFromLocalStorage() || []);

  const syncCart = (newCartitems) => {
    setCartToLocalStorage(newCartitems);
    setCart(newCartitems);
  };

  return <CartContext.Provider value={{ cart, syncCart }}>{children}</CartContext.Provider>;
};

