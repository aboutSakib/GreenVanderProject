const moment = require("moment");
const FlashSale = require("../models/FlashSale");

// Get flash sale status
const getFlashSaleStatus = async (req, res) => {
  try {
    const sale = await FlashSale.findOne().sort({ start: -1 }); // Fetch the most recent sale
    const now = moment();

    if (!sale) {
      return res.status(404).json({ message: "No flash sale available." });
    }

    const flashSaleStart = moment(sale.start);
    const flashSaleEnd = moment(sale.end);
    let timeRemaining;

    if (now.isBefore(flashSaleStart)) {
      timeRemaining = flashSaleStart.diff(now);
      res.status(200).json({
        status: "upcoming",
        message: "Flash sale hasn't started yet!",
        starts_in: moment.duration(timeRemaining).humanize(),
        countdown: timeRemaining,
      });
    } else if (now.isBetween(flashSaleStart, flashSaleEnd)) {
      timeRemaining = flashSaleEnd.diff(now);
      res.status(200).json({
        status: "ongoing",
        message: "Flash sale is live!",
        ends_in: moment.duration(timeRemaining).humanize(),
        countdown: timeRemaining,
      });
    } else {
      res.status(200).json({
        status: "ended",
        message: "Flash sale has ended!",
        countdown: 0,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// get the flash sale
const getFlashSale = async (req, res) => {
  try {
    console.log("hello");
    const sale = await FlashSale.findOne().sort({ start: -1 });
    console.log(sale); // Fetch the most recent sale
    res.status(200).json(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Create or update flash sale
const createOrUpdateFlashSale = async (req, res) => {
  try {
    const { start, end } = req.body;

    // Validate inputs
    if (!start || !end) {
      return res
        .status(400)
        .json({ message: "Start and end dates are required." });
    }

    // Update if a flash sale exists, else create a new one
    let sale = await FlashSale.findOne();
    if (sale) {
      sale.start = new Date(start);
      sale.end = new Date(end);
      await sale.save();
    } else {
      sale = new FlashSale({ start: new Date(start), end: new Date(end) });
      await sale.save();
    }

    res
      .status(200)
      .json({ message: "Flash sale created/updated successfully.", sale });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete flash sale
const deleteFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await FlashSale.findByIdAndDelete(id);

    if (!sale) {
      return res.status(404).json({ message: "Flash sale not found." });
    }

    res.status(200).json({ message: "Flash sale deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getFlashSaleStatus,
  createOrUpdateFlashSale,
  deleteFlashSale,
  getFlashSale,
};
