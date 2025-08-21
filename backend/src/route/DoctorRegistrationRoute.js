// backend/src/route/DoctorRegistrationRoute.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getAllDoctors, getDoctorsBySpecialty, registerDoctor } from "../controller/DoctorRegistrationController.js";

const authRoutes = express.Router();

const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

authRoutes.post(
  "/register",
  upload.fields([
    { name: "licensePhoto", maxCount: 1 },
    { name: "doctorPhoto", maxCount: 1 },
  ]),
  registerDoctor
);

authRoutes.get('/doctor', getAllDoctors);
authRoutes.get("/specialty/:specialization", getDoctorsBySpecialty);

export default authRoutes;