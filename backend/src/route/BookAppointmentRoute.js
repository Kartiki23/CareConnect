import express from 'express';
import {
  bookAppointment,
  cancelAppointment,
  getAppointmentsForDoctor,
  getAppointmentsForPatient,
  updateAppointmentStatus
} from '../controller/BookAppointmentController.js';

const bookAppointmentRoute = express.Router();

bookAppointmentRoute.post('/bookAppointment', bookAppointment);
bookAppointmentRoute.get('/getAppointmentsForDoctor', getAppointmentsForDoctor);
bookAppointmentRoute.get('/getAppointmentsForPatient', getAppointmentsForPatient);
bookAppointmentRoute.patch('/updateStatus', updateAppointmentStatus);
bookAppointmentRoute.delete('/cancelAppointment/:appointmentId', cancelAppointment);

export default bookAppointmentRoute;
