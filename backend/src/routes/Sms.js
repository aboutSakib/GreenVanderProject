const express = require("express");
const { addSMS, getAllSMS, deleteSMS } = require("../controller/Sms");
const { authenticateToken } = require("../utils/authMiddleware");

const router = express.Router();

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
}

// Add a new SMS (Admins only)
router.post("/add-sms", addSMS);

// Get all SMS records (Admins only)
router.get("/all-sms", authenticateToken, isAdmin, getAllSMS);

// Delete an SMS (Admins only)
router.delete("/delete-sms/:id", authenticateToken, isAdmin, deleteSMS);

// // Route to fetch all unread SMS (status = "Pending")
// router.get("/unread-sms", async (req, res) => {
//   try {
//     const unreadSMS = await SMS.find({ status: "Pending" });
//     res.status(200).json(unreadSMS);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching unread SMS" });
//   }
// });

// // Route to mark an SMS as read (change status from "Pending" to "Sent")
// router.put("/mark-as-read/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedSMS = await SMS.findByIdAndUpdate(
//       id,
//       { status: "Sent" }, // Update the status to "Sent"
//       { new: true } // Return the updated document
//     );

//     if (!updatedSMS) {
//       return res.status(404).json({ message: "SMS not found" });
//     }

//     res.status(200).json({ message: "SMS marked as read", sms: updatedSMS });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating SMS status" });
//   }
// });

module.exports = router;
