const FAQ = require("../models/faq");

// Get all FAQs
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single FAQ by ID
const getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new FAQ
const createFAQ = async (req, res) => {
  const faq = new FAQ({
    question: req.body.question,
    answer: req.body.answer,
  });
  try {
    const newFAQ = await faq.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an FAQ by ID
const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an FAQ by ID
const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export the functions as an object
module.exports = {
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};
