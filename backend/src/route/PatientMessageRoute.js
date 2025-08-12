// src/route/PatientMessageRoute.js
import express from "express";

import {
  getMyDoctors,
  getConversation,
  createMessage,
} from "../controller/MessageController.js";

//import Message from "../models/MessageModel.js";
//import Appointment from "../models/AppointmentModel.js";
//import Doctor from "../models/DoctorModel.js";
//import { verifyToken } from "../middleware/authMiddleware.js";
import { messageModel } from "../model/PatientMessageModel.js";
import { appointment } from "../model/BookAppointmentModel.js";
import { docRegModel } from "../model/DoctorRegistrationModel.js";
import { authenticateDoctor } from "../middleware/DoctorLoginMiddleware.js";


const patientMessageRoutes = express.Router();

// Get doctors for a patient (patientId param)
patientMessageRoutes.get("/user/:patientId/doctors", getMyDoctors);

// Get conversation messages between patient and doctor
patientMessageRoutes.get("/:patientId/:doctorId", getConversation);

// Create/send message (persist)
patientMessageRoutes.post("/", createMessage);

patientMessageRoutes.get("/user/:patientId/doctors", async (req, res) => {

// Get doctors the patient has appointments with
router.get("/my-doctors", authenticateDoctor , async (req, res) => {
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

// Get messages for a conversation
router.get("/:doctorId", authenticateDoctor , async (req, res) => {
  try {
    const patientId = req.user.id;
    const doctorId = req.params.doctorId;

    const messages = await messageModel.find({
      $or: [
        { senderId: patientId, receiverId: doctorId },
        { senderId: doctorId, receiverId: patientId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a message
router.post("/",authenticateDoctor , async (req, res) => {

  try {
    const { patientId } = req.params;


    // Find all doctorIds from appointments for this patient
    const appts = await appointment.find({ patientId }).select("doctorId").lean();
    const doctorIds = appts.map(a => a.doctorId);

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message
    });


    // Get doctor details
    const doctors = await docRegModel.find({ _id: { $in: doctorIds } }, { password: 0, licensePhoto: 0 });
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default patientMessageRoutes;