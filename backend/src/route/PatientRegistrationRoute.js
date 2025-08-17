// backend/src/route/PatientRegistrationRoute.js
import express from 'express';
import multer from "multer";
import { registerPatient } from '../controller/PatientRegistrationController.js';

const patientRegisterrouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/patients"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

patientRegisterrouter.post('/Pregister', upload.single("patientPhoto"), registerPatient);

export default patientRegisterrouter;