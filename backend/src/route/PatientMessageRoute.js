// src/route/PatientMessageRoute.js
import express from "express";

import {
  getMyDoctors,
  getConversation,
  createMessage,
} from "../controller/MessageController.js";
import { appointment } from "../model/BookAppointmentModel.js";
import { docRegModel } from "../model/DoctorRegistrationModel.js";

const patientMessageRoutes = express.Router();

// Get doctors for a patient (patientId param)
patientMessageRoutes.get("/user/:patientId/doctors", getMyDoctors);

// Get conversation messages between patient and doctor
patientMessageRoutes.get("/:patientId/:doctorId", getConversation);

// Create/send message (persist)
patientMessageRoutes.post("/", createMessage);

patientMessageRoutes.get("/user/:patientId/doctors", async (req, res) => {

  try {
    const patientId = req.user.id;

    const appointments = await appointment.find({ patientId }).select("doctorId");
    const doctorIds = [...new Set(appointments.map(a => a.doctorId.toString()))];

    const doctors = await docRegModel.find({ _id: { $in: doctorIds } })
      .select("_id fullName doctorPhoto");

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default patientMessageRoutes;