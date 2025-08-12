// src/controller/PatientMessageController.js
import { MessageModel } from "../model/PatientMessageModel.js";
import { appointment } from "../model/BookAppointmentModel.js"; // path/name from your project
import { docRegModel } from "../model/DoctorRegistrationModel.js";

/**
 * Helper deterministic conversation id
 */
const makeConversationId = (a, b) => [String(a), String(b)].sort().join("_");

/**
 * GET /api/v1/messages/user/:patientId/doctors
 * Returns doctors that patient has appointments with.
 * If no appointments are found, returns all doctors as a fallback.
 */
export const getMyDoctors = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) return res.status(400).json({ message: "patientId required" });

    // Get doctor IDs from appointment collection
    const appts = await appointment.find({ patientId }).select("doctorId").lean();
    const doctorIds = [...new Set(appts.map(a => String(a.doctorId)).filter(Boolean))];

    let doctors;
    if (doctorIds.length) {
      doctors = await docRegModel.find({ _id: { $in: doctorIds } })
        .select("fullName specialization doctorPhoto")
        .lean();
    } else {
      // fallback (you can remove fallback in production)
      doctors = await docRegModel.find().select("fullName specialization doctorPhoto").lean();
    }

    res.json(doctors);
  } catch (err) {
    console.error("getMyDoctors error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/v1/messages/:patientId/:doctorId
 * Return conversation messages sorted by createdAt asc.
 */
export const getConversation = async (req, res) => {
  try {
    const { patientId, doctorId } = req.params;
    if (!patientId || !doctorId) return res.status(400).json({ message: "Missing ids" });

    const conversationId = makeConversationId(patientId, doctorId);
    const messages = await MessageModel.find({ conversationId }).sort({ createdAt: 1 }).lean();

    res.json(messages.map(m => ({
      senderId: m.senderId,
      receiverId: m.receiverId,
      message: m.message,
      createdAt: m.createdAt
    })));
  } catch (err) {
    console.error("getConversation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/v1/messages
 * Create + save a message. Body: { senderId, receiverId, message }
 */
export const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: "senderId, receiverId and message are required" });
    }

    const conversationId = makeConversationId(senderId, receiverId);
    const newMsg = new MessageModel({ conversationId, senderId, receiverId, message });
    await newMsg.save();

    res.status(201).json(newMsg);
  } catch (err) {
    console.error("createMessage error:", err);
    res.status(500).json({ message: "Server error" });
  }
};