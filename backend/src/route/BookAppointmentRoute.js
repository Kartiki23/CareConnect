import express from 'express'
import { bookAppointment, getAppointmentsForDoctor, updateAppointmentStatus } from '../controller/BookAppointmentController.js'

const bookAppointmentRoute = express.Router()

bookAppointmentRoute.post('/bookAppointment',bookAppointment);

bookAppointmentRoute.get('/getAppointmentsForDoctor',getAppointmentsForDoctor);

bookAppointmentRoute.patch('/updateStatus',updateAppointmentStatus);

export default bookAppointmentRoute;