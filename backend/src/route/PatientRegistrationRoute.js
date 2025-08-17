// src/route/PatientRegistrationRoute.js
import express from "express";
import { registerPatient, reverseGeocodeEndpoint } from "../controller/PatientRegistrationController.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const patientRegisterrouter = express.Router();

// Ensure upload dir exists
const uploadDir = path.join("uploads", "patients");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
export const upload = multer({ storage });

patientRegisterrouter.post("/Pregister", upload.single("patientPhoto"), registerPatient);

// reverse-geocode helper used by frontend to show address instantly
patientRegisterrouter.get("/reverse-geocode", reverseGeocodeEndpoint);

export default patientRegisterrouter;