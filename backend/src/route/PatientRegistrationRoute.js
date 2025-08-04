

import express from 'express';
import { registerPatient } from '../controller/PatientRegistrationController.js';

const patientRegisterrouter = express.Router();

patientRegisterrouter.post('/Pregister', registerPatient);

export default patientRegisterrouter;