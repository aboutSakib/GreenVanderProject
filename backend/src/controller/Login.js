const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  generateToken,
  verifyToken,
  generateRefreshToken,
} = require("../utils/authUtils");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.error("User not found for email:", email);
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Invalid password for email:", email);
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT and send response
    const token = await generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { oldToken } = req.body;

    // Verify and decode the old token
    const decodedToken = verifyToken(oldToken);
    const existingUser = await User.findById(decodedToken.id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Generate a new refresh token
    const newToken = generateRefreshToken(existingUser);
    res.json({ token: newToken });
  } catch (error) {
    console.error("Token refresh error:", error);
    next(error);
  }
};

module.exports = { login, refreshToken };
