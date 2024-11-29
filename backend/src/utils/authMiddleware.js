const { verifyToken, decodeToken } = require("./authUtils");

// Middleware for token authentication
function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.error("Authorization header missing");
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer.toLowerCase() !== "bearer" || !token) {
    console.error("Token format issue or missing token in header:", authHeader);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }

  // Decode token for inspection (without verifying)
  const decoded = decodeToken(token);

  try {
    const verifiedUser = verifyToken(token);
    req.user = verifiedUser; // Attach user info to request
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
}

module.exports = { authenticateToken };
