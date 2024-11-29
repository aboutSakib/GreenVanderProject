const Supplier = require("../models/Supplier");

// Add a new supplier
async function addSupplier(req, res, next) {
  try {
    const { name, contactEmail, contactPhone, address, productsSupplied } =
      req.body;

    const newSupplier = new Supplier({
      name,
      contactEmail,
      contactPhone,
      address,
      productsSupplied,
    });

    const savedSupplier = await newSupplier.save();
    res
      .status(201)
      .json({
        message: "Supplier added successfully",
        supplier: savedSupplier,
      });
  } catch (error) {
    next(error);
  }
}

// Update supplier details
async function updateSupplier(req, res, next) {
  try {
    const { id } = req.params;
    const { name, contactEmail, contactPhone, address, productsSupplied } =
      req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { name, contactEmail, contactPhone, address, productsSupplied },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res
      .status(200)
      .json({
        message: "Supplier updated successfully",
        supplier: updatedSupplier,
      });
  } catch (error) {
    next(error);
  }
}

// Get suppliers with optional search
async function getSuppliers(req, res, next) {
  try {
    const { search } = req.query;

    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { contactEmail: { $regex: search, $options: "i" } },
          { contactPhone: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
        ],
      };
    }

    const suppliers = await Supplier.find(filter);
    res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
}

// Delete a supplier
async function deleteSupplier(req, res) {
  try {
    const { id } = req.params;

    const deletedSupplier = await Supplier.findByIdAndDelete(id);
    if (!deletedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { addSupplier, updateSupplier, getSuppliers, deleteSupplier };
