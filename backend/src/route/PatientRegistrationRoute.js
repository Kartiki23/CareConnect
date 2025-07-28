

import express from 'express';
import { registerPatient } from '../controller/PatientRegistrationController.js';

const router = express.Router();

router.post('/register', registerPatient);

export default router;