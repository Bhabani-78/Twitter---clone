import User from "../models/user_model.js";
import jwt from "jsonwebtoken";

export const protectedRoute = async(req,res,next) => {
  try {
    const token = req.cookies.jwt;
    if(!token){
      return res.status(401).json({error: "Unauthorized: No Token Provided"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      return res.status(401).json({error: "Unauthorized: Invalid Token"});
    }

    const user = await User.findById(decoded.userId).select("-password"); // -password means it can remove password and get back to client with other details in response.

    if(!user){
      return res.status(404).json({error: "User not found."});
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Error in protectedRoute middleware", error.message);
    return res.status(500).json({error: "Internal Server Error"});
  }
}