const ShippingMethod = require("../models/ShippingMethod");

// Add a new shipping method
async function addShippingMethod(req, res, next) {
  try {
    const { name, cost, estimatedDeliveryTime } = req.body;

    const newShippingMethod = new ShippingMethod({
      name,
      cost,
      estimatedDeliveryTime
    });

    const savedShippingMethod = await newShippingMethod.save();
    res.status(201).json({ message: "Shipping method added successfully", shippingMethod: savedShippingMethod });
  } catch (error) {
    next(error);
  }
}

// Get all shipping methods
async function getAllShippingMethods(req, res, next) {
  try {
    const shippingMethods = await ShippingMethod.find();
    res.status(200).json(shippingMethods);
  } catch (error) {
    next(error);
  }
}

// Update a shipping method
async function updateShippingMethod(req, res, next) {
  try {
    const { id } = req.params;
    const { name, cost, estimatedDeliveryTime, isActive } = req.body;

    const updatedShippingMethod = await ShippingMethod.findByIdAndUpdate(
      id,
      { name, cost, estimatedDeliveryTime, isActive },
      { new: true }
    );

    if (!updatedShippingMethod) {
      return res.status(404).json({ message: "Shipping method not found" });
    }

    res.status(200).json({ message: "Shipping method updated successfully", shippingMethod: updatedShippingMethod });
  } catch (error) {
    next(error);
  }
}

module.exports = { addShippingMethod, getAllShippingMethods, updateShippingMethod };
