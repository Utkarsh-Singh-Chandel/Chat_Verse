//before we run send message function we check
// if user is logged in or not using this middleware function
//used for auth
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    //to get cookie we have used cookie parser in server .js
    if (!token) {
      return res.status(401).json({ error: "Unauthorised: No token found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorised: Invalid Token" });
    }
    const user = await User.findById(decoded.userID).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User Not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route middleware", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
export default protectRoute;
