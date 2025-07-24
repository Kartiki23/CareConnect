
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { registerDoctor } from "../controller/DoctorRegistrationController.js";

const authRoutes = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// POST route
authRoutes.post(
  "/register",
  upload.fields([
    { name: "licensePhoto", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  registerDoctor
);

export default authRoutes;