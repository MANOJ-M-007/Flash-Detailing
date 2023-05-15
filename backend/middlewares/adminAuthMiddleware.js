const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await User.findById(decoded.id).select("-password");
      req.admin = admin._id;
      if (!admin.isAdmin) {
        res.status(401);
        throw new Error("Not admin");
      }
      req.admin = admin;

      next();
    } catch (error) {
      if (error.message == "Not admin") {
        res.status(401);
        throw new Error("Protected route, only admin can access this route");
      }
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = adminProtect;
