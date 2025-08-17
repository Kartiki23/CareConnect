import express from 'express';
import upload from '../middleware/MulterConfig.js';
import { getPatientProfile, updatePatientInfo } from '../controller/PatientDashboardController.js';
import { authenticate, authorizeRole } from '../middleware/LoginMiddleware.js';


const patientDashboardRoute = express.Router();

patientDashboardRoute.post("/patientProfile", authenticate, authorizeRole("patient"), getPatientProfile);
patientDashboardRoute.put("/updatePatientInfo", authenticate, authorizeRole("patient"), upload.single("patientPhoto"), updatePatientInfo);

export default patientDashboardRoute;