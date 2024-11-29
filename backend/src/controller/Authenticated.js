const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");

// Check if a user is an admin
const checkAdminStatus = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ admin: user.role === "admin" });
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users (admin access)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Password reset request
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetLink = `http://localhost:5000/reset-password?token=${resetToken}`;
    await sendEmail(user.email, "Password Reset", `Reset link: ${resetLink}`);

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Change user password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle user role (admin only)
const toggleUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = user.role === "admin" ? "customer" : "admin";
    await user.save();

    res.status(200).json({ message: `User role updated to ${user.role}` });
  } catch (error) {
    console.error("Error toggling user role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  checkAdminStatus,
  getAllUsers,
  forgotPassword,
  resetPassword,
  changePassword,
  toggleUserRole,
};
