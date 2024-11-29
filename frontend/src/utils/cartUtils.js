// Utility function to get cart from localStorage
export function getCartFromLocalStorage() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function setCartToLocalStorage(newCart) {
  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(newCart));
}
