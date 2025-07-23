import express from 'express'
import { doctorRegister } from '../controller/DoctorRegisterController.js';

const doctorReg = express.Router();

doctorReg.post('/registration',doctorRegister)

export default doctorReg;