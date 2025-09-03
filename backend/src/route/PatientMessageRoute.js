// src/route/PatientMessageRoute.js
import express from "express";
import { chatMessageAppointment, getAcceptedDoctors, getAcceptedPatients, getMessages, markAsRead, mychats, sendMessage} from "../controller/MessageController.js";
import { appointment } from "../model/BookAppointmentModel.js";

const patientMessageRoutes = express.Router();

patientMessageRoutes.get("/messages/:appointmentId", getMessages);
patientMessageRoutes.post("/send", sendMessage); // optional REST send
patientMessageRoutes.post("/read", markAsRead);
patientMessageRoutes.get("/acceptedPatients/:doctorId", getAcceptedPatients);
patientMessageRoutes.get("/patient/:patientId/doctors", getAcceptedDoctors);

patientMessageRoutes.get("/myChats/:userId/:userModel", mychats);

// Get messages of a chat
patientMessageRoutes.get("/:appointmentId",chatMessageAppointment)

export default patientMessageRoutes;

