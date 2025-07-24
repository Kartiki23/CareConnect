import express from 'express'
import { docRegistration } from '../controller/DoctorRegistrationController.js';


const authRoutes = express.Router();

authRoutes.post('/register',docRegistration)

export default authRoutes;