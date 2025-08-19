import express from 'express'
import { getPatientProfile, updatePatientInfo } from '../controller/PatientDashboardController.js';
import upload from '../middleware/MulterConfig.js';
import { authenticatePatient } from '../middleware/LoginMiddleware.js';

const patientDashboardRoute = express.Router();

patientDashboardRoute.post("/patientProfile",getPatientProfile);

patientDashboardRoute.put("/updatePatientInfo",upload.single("patientPhoto"),updatePatientInfo)

export default patientDashboardRoute;