const Order = require("../models/Order");
const Product = require("../models/Product");

// Add a new order
async function addOrder(req, res, next) {
  try {
    const { customerName, customerEmail, customerPhone, shippingAddress, products, totalAmount, paymentMethod, userId } = req.body;

    // Validate products
    for (const product of products) {
      const productExists = await Product.findById(product.productId);
      if (!productExists) {
        return res.status(404).json({ message: `Product with ID ${product.productId} not found` });
      }
    }

    const newOrder = new Order({
      userId, // Ensure req.user.id is defined
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      products,
      totalAmount,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    next(error);
  }
}

// Update order status
async function updateOrderStatus(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
}

// Get orders with optional filters and sorting
async function getOrders(req, res, next) {
  const { page = 1, limit = 10 } = req.query;

  try {
    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber) // Skip documents for previous pages
      .limit(limitNumber); // Limit documents to the specified number;

    // Get the total number of products for calculating total pages
    const totalOrders = await Order.countDocuments();
    const totalPages = Math.ceil(totalOrders / limitNumber);

    res.status(200).json({
      currentPage: pageNumber,
      totalPages,
      totalOrders,
      orders,
    });
  } catch (error) {
    next(error);
  }
}
// Get Cart Items for a User by Email
const getSingleOrder = async (req, res) => {
  try {
    const { userId } = req.params; // Change to userId from params

    // Fetch orders for the specific user ID
    const singleOrder = await Order.find({ userId });

    if (!singleOrder.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(singleOrder);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ error: "Error fetching order items" });
  }
};

module.exports = { addOrder, updateOrderStatus, getOrders, getSingleOrder };
