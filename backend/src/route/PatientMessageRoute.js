import express from "express";
import Message from "../models/MessageModel.js";
import Appointment from "../models/AppointmentModel.js";
import Doctor from "../models/DoctorModel.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get doctors the patient has appointments with
router.get("/my-doctors", verifyToken, async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointments = await Appointment.find({ patientId }).select("doctorId");
    const doctorIds = [...new Set(appointments.map(a => a.doctorId.toString()))];

    const doctors = await Doctor.find({ _id: { $in: doctorIds } })
      .select("_id fullName doctorPhoto");

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages for a conversation
router.get("/:doctorId", verifyToken, async (req, res) => {
  try {
    const patientId = req.user.id;
    const doctorId = req.params.doctorId;

    const messages = await Message.find({
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
router.post("/", verifyToken, async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id;

    const newMessage = new Message({
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
