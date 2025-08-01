import express from 'express'
import { bookAppointment } from '../controller/BookAppointmentController.js'

const bookAppointmentRoute = express.Router()

bookAppointmentRoute.post('/bookAppointment',bookAppointment)

export default bookAppointmentRoute;