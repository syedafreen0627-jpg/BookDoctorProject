const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    // Get Authorization header
    const authHeader = req.header("Authorization");

    console.log("Authorization Header:",authHeader);
    
    // Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided."
      });
    }

    // Remove "Bearer " from the token
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Save user info
    req.user = verified;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token"
    });
  }
};

module.exports = authMiddleware;