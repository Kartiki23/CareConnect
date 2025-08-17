// backend/middleware/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // use ONE secret

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // decoded should contain: { sub: <id>, role: 'doctor' | 'patient', iat, exp }
    if (!decoded?.sub || !decoded?.role) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = { id: decoded.sub, role: decoded.role };
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export const authorizeRole = (...allowed) => (req, res, next) => {
  if (!req.user?.role || !allowed.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: insufficient role" });
  }
  next();
};