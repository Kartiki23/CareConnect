import express from 'express'
import { getPatientProfile, updatePatientInfo } from '../controller/PatientDashboardController.js';
import upload from '../middleware/MulterConfig.js';
import { authenticatePatient } from '../middleware/LoginMiddleware.js';

const patientDashboardRoute = express.Router();

patientDashboardRoute.post("/patientProfile", authenticatePatient,getPatientProfile);

patientDashboardRoute.put("/updatePatientInfo",upload.single("patientPhoto"),authenticatePatient,updatePatientInfo)

export default patientDashboardRoute;
