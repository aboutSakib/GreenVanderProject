const jwt = require("jsonwebtoken");
const secretKey = require("../config/jwtConfig");

// Generates an access token for a user
function generateToken(user) {
  const payload = {
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}
// Generates a refresh token for a user
function generateRefreshToken(user) {
  const payload = {
    email: user.email,
    role: user.role,
  };
  console.log("genarate token", payload);

  return jwt.sign(payload, secretKey, { expiresIn: "7h" });
}

// Verifies a JWT token and returns the decoded payload if valid
function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    throw new Error("Invalid token");
  }
}

// Decodes a JWT without verifying for inspection purposes
function decodeToken(token) {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error("Token decoding failed:", error.message);
    return null;
  }
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
};
