import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";

const protect = asyncHandler(async (req, res, next) => {
  console.log("enterd at the protect")
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decoded.userId).select("-password");
      console.log("protected at the end")
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
