import express from "express";
//import Message from "../models/MessageModel.js";
//import Appointment from "../models/AppointmentModel.js";
//import Doctor from "../models/DoctorModel.js";
//import { verifyToken } from "../middleware/authMiddleware.js";
import { messageModel } from "../model/PatientMessageModel.js";
import { appointment } from "../model/BookAppointmentModel.js";
import { docRegModel } from "../model/DoctorRegistrationModel.js";
import { authenticateDoctor } from "../middleware/DoctorLoginMiddleware.js";

const router = express.Router();

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
    const { receiverId, message } = req.body;
    const senderId = req.user.id;

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message
    });

    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
