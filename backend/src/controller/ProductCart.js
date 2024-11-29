const CartItem = require("../models/ProductCart");

// Add a Cart Item for a User
const addCartItem = async (req, res) => {
  const { productId, email, name, colors, sizes, price, originalPrice, quantity, images } = req.body;

  try {
    // Check if the product is already in the user's cart
    const existingCartItem = await CartItem.findOne({ productId, email });

    if (existingCartItem) {
      // Update quantity if product exists
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: "Cart updated", cartItem: existingCartItem });
    } else {
      // Create a new cart item if it does not exist
      const newCartItem = new CartItem({
        email,
        productId, // Use productId as a reference to the product
        name,
        colors,
        sizes,
        price,
        originalPrice,
        quantity,
        images,
      });

      await newCartItem.save();
      res.status(201).json({ message: "Item added to cart", cartItem: newCartItem });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  const { quantity, email, _id } = req.body;

  try {
    // Update the quantity of the product
    const updatedProduct = await CartItem.findOneAndUpdate(
      { email, _id },
      { $set: { quantity } },
      { new: true } // Returns the updated document
    );

    if (updatedProduct) {
      return res.status(200).json({ message: "Quantity updated", cartItem: updatedProduct });
    } else {
      // No matching document was found
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating the product quantity:", error);
    res.status(500).json({ message: "Error updating the product quantity", error: error.message });
  }
};


// Get Cart Items for a User by Email
const getCartItems = async (req, res) => {
  try {
    const { email } = req.params;

    // Use the correct model 'CartItem'
    const cartItems = await CartItem.find({ email });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Error fetching cart items" });
  }
};

// Get All Cart Items
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart items" });
  }
};

// Delete a Cart Item by Email and Product ID
const deleteCartItem = async (req, res) => {
  const { email, itemId } = req.params; // Destructure email and itemId from params

  try {
    console.log(`Deleting item with ID: ${itemId} for email: ${email}`); // Debug log

    const item = await CartItem.findOneAndDelete({ _id: itemId, email });

    if (!item) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(204).send(); // No content response on successful deletion
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Error deleting cart item" });
  }
};

const clearCart = async (req, res) => {
  const { email } = req.params;

  try {
    // Clear all items in the cart for the specified email
    await CartItem.deleteMany({ email });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
module.exports = {
  addCartItem,
  getCartItems,
  deleteCartItem,
  getAllCartItems,
  clearCart,
  updateCartQuantity,
};
