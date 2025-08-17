import express from 'express';
import multer from "multer";
import { getDoctorDashboard, getDoctorProfile, updateDoctorInfo } from '../controller/DoctorDashboardController.js';
import { authenticate, authorizeRole } from '../middleware/LoginMiddleware.js';

const docDashboardRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

docDashboardRouter.post("/doctorProfile", authenticate, authorizeRole("doctor"), getDoctorProfile);
docDashboardRouter.put('/updatedoctorInfo', authenticate, authorizeRole("doctor"), upload.single("doctorPhoto"), updateDoctorInfo);
docDashboardRouter.get('/dashboard/:doctorId', authenticate, authorizeRole("doctor"), getDoctorDashboard);

export default docDashboardRouter;