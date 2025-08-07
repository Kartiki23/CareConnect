import express from 'express'
import { getPatientProfile, updatePatientInfo } from '../controller/PatientDashboardController.js';

const patientDashboardRoute = express.Router();

patientDashboardRoute.post("/patientProfile",getPatientProfile);

patientDashboardRoute.put("/updatePatientInfo",updatePatientInfo)

export default patientDashboardRoute;
// docDashboardRouter.put('/updatedoctorInfo',upload.single("doctorPhoto"),authenticateDoctor,updateDoctorInfo);

// export default docDashboardRouter;