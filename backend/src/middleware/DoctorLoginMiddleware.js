
import jwt from "jsonwebtoken";

export const authenticateDoctor = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach doctor ID to request object
    req.doctorId = decoded.doctorId;

    next(); // Proceed to next middleware or controller
  } catch (error) {
    console.log("Authentication error:", error.message);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
