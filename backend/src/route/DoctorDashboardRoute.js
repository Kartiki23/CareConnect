import express from 'express'
import { getDoctorProfile, updateDoctorInfo } from '../controller/DoctorDashboardController.js';
import { authenticateDoctor } from '../middleware/DoctorLoginMiddleware.js';
import multer from "multer";
import path from "path";

const docDashboardRouter = express.Router();

docDashboardRouter.post("/doctorProfile", authenticateDoctor,getDoctorProfile); 

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

docDashboardRouter.put('/updatedoctorInfo',upload.single("doctorPhoto"),authenticateDoctor,updateDoctorInfo);

export default docDashboardRouter;