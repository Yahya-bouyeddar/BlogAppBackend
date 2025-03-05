const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv');

const auth = async (req, res, next) => {
  dotenv.config();
  try {
    // Check if Authorization header exists
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "No Authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("Received token:", token);
    console.log('jwt', process.env.JWT_SECRET)
    // Use same secret as in authController
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Fix: Use decoded.id instead of decoded._id
    const user = await User.findOne({ _id: decoded.id });
    console.log("Found user:", user ? "yes" : "no");

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ error: "Please authenticate", details: error.message });
  }
};

module.exports = auth;
