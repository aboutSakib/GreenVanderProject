const ComboCartItem = require("../models/ComboCart");

// Add a Cart Item for a User
const addComboCartItem = async (req, res) => {
  try {
    const cart = req.body;
    const existingItems = await ComboCartItem.find({ email: cart.email });

    if (existingItems.length >= 3) {
      return res
        .status(400)
        .json({ error: "You can only have up to 3 items in the cart." });
    }

    const result = await ComboCartItem.create(cart);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding cart item:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Cart Items for a User by Email
const getComboCartItems = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(`Fetching cart items for email: ${email}`); // Debug log

    const cartItems = await ComboCartItem.find({ email });
    console.log("Fetched Cart Items:", cartItems); // Log fetched items

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Error fetching cart items" });
  }
};

// Get All Cart Items
const getAllComboCartItems = async (req, res) => {
  try {
    const cartItems = await ComboCartItem.find();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching all cart items:", error);
    res.status(500).json({ error: "Error fetching cart items" });
  }
};

// Delete a Cart Item by Email and Product ID
const deleteComboCartItem = async (req, res) => {
  const { email, itemId } = req.params;

  try {
    const item = await ComboCartItem.findOneAndDelete({ _id: itemId, email });

    if (!item) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Error deleting cart item" });
  }
};

module.exports = {
  addComboCartItem,
  getComboCartItems,
  deleteComboCartItem,
  getAllComboCartItems,
};
