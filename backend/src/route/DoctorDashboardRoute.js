import express from 'express'
import { getDoctorProfile } from '../controller/DoctorDashboardController.js';

const docDashboardRouter = express.Router();

docDashboardRouter.get("/doctorProfile", getDoctorProfile); 

export default docDashboardRouter;