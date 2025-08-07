import express from 'express'
import { getDoctorProfile } from '../controller/DoctorDashboardController.js';
import { authenticateDoctor } from '../middleware/DoctorLoginMiddleware.js';

const docDashboardRouter = express.Router();

docDashboardRouter.post("/doctorProfile", authenticateDoctor,getDoctorProfile); 

export default docDashboardRouter;