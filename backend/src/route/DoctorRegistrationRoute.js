import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getAllDoctors, registerDoctor, updateDoctorLocation } from "../controller/DoctorRegistrationController.js";

const authRoutes = express.Router();

const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// register
authRoutes.post(
  "/register",
  upload.fields([
    { name: "licensePhoto", maxCount: 1 },
    { name: "doctorPhoto", maxCount: 1 },
  ]),
  registerDoctor
);

// list doctors
authRoutes.get("/doctor", getAllDoctors);

// 🆕 update location (DoctorProfile)
authRoutes.put("/doctor/:id/location", express.json(), updateDoctorLocation);

export default authRoutes;