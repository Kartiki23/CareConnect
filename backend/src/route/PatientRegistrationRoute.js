

import express from 'express';
import { registerPatient } from '../controller/PatientRegistrationController.js';
import multer from "multer";

const patientRegisterrouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/patients"); // folder to store uploaded photos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

patientRegisterrouter.post('/Pregister', upload.single("patientPhoto"),registerPatient);

export default patientRegisterrouter;