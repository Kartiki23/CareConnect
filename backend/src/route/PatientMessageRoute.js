// src/route/PatientMessageRoute.js
import express from "express";
import {
  getMyDoctors,
  getConversation,
  createMessage,
} from "../controller/MessageController.js";

const patientMessageRoutes = express.Router();

// Get doctors for a patient (patientId param)
patientMessageRoutes.get("/user/:patientId/doctors", getMyDoctors);

// Get conversation messages between patient and doctor
patientMessageRoutes.get("/:patientId/:doctorId", getConversation);

// Create/send message (persist)
patientMessageRoutes.post("/", createMessage);

patientMessageRoutes.get("/user/:patientId/doctors", async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find all doctorIds from appointments for this patient
    const appts = await appointment.find({ patientId }).select("doctorId").lean();
    const doctorIds = appts.map(a => a.doctorId);

    // Get doctor details
    const doctors = await docRegModel.find({ _id: { $in: doctorIds } }, { password: 0, licensePhoto: 0 });
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default patientMessageRoutes;