// src/controller/MessageController.js
import { appointment } from "../model/BookAppointmentModel.js";
import { ChatMessage } from "../model/PatientMessageModel.js";

/**
 * ✅ Mark messages as read
 */
export const markAsRead = async (req, res) => {
  try {
    const { appointmentId, userId } = req.body;
    if (!appointmentId || !userId)
      return res.status(400).json({ error: "appointmentId and userId required" });

    await ChatMessage.updateMany(
      { appointmentId, "readBy.userId": { $ne: userId } },
      { $push: { readBy: { userId, readAt: new Date() } } }
    );

    res.json({ success: true });
  } catch (error) {
    console.error("markAsRead error:", error);
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
};

/**
 * ✅ Send a message (only if appointment accepted)
 * @param req.body: { appointmentId, senderId, senderModel, message }
 * @param io: Socket.IO instance from server
 */
export const sendMessage = async (req, res) => {
  try {
    const io = req.app.get("io"); // get io instance from server
    let { appointmentId, senderId, senderModel, message } = req.body;

    if (!appointmentId || !senderId || !senderModel || !message)
      return res.status(400).json({ error: "Missing required fields" });

    const appt = await appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ error: "Appointment not found" });
    if (appt.status !== "accepted")
      return res.status(403).json({ error: "Chat allowed only after appointment acceptance" });

    const normalizedModel = senderModel === "Doctor" ? "docregmodels" : "patients";

    const chatMessage = new ChatMessage({
      appointmentId,
      senderId,
      senderModel: normalizedModel,
      message,
      readBy: [{ userId: senderId, readAt: new Date() }],
    });

    const saved = await chatMessage.save();

    // ✅ Emit the message to the appointment room
    io.to(appointmentId).emit("receiveMessage", saved);

    res.status(201).json({ success: true, message: saved });
  } catch (err) {
    console.error("sendMessage error:", err);
    res.status(500).json({ error: "Failed to send message", details: err.message });
  }
};

/**
 * ✅ Get chat history for an appointment
 */
export const getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    if (!appointmentId) return res.status(400).json({ error: "appointmentId required" });

    const messages = await ChatMessage.find({ appointmentId })
      .sort({ createdAt: 1 })
      .populate("senderId", "fullName email");

    res.json({ success: true, messages });
  } catch (err) {
    console.error("getMessages error:", err);
    res.status(500).json({ error: "Failed to fetch messages", details: err.message });
  }
};

/**
 * ✅ Get accepted patients for doctor (chat sidebar)
 */
export const getAcceptedPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;
    if (!doctorId) return res.status(400).json({ error: "doctorId required" });

    const appts = await appointment
      .find({ doctorId, status: "accepted" })
      .populate("patientId", "fullName email");

    const result = appts.map((a) => ({
      appointmentId: a._id,
      patientId: a.patientId?._id,
      name: a.patientId?.fullName || "Unknown Patient",
      email: a.patientId?.email || "",
      appointmentDate: a.appointmentDate,
      appointmentTime: a.appointmentTime,
    }));

    res.json({ success: true, patients: result });
  } catch (err) {
    console.error("getAcceptedPatients error:", err);
    res.status(500).json({ error: "Failed to fetch accepted patients" });
  }
};

/**
 * ✅ Get accepted doctors for patient (chat sidebar)
 */
export const getAcceptedDoctors = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) return res.status(400).json({ error: "patientId required" });

    const appts = await appointment
      .find({ patientId, status: "accepted" })
      .populate("doctorId", "fullName email");

    const result = appts.map((a) => ({
      appointmentId: a._id,
      doctorId: a.doctorId?._id,
      name: a.doctorId?.fullName || "Unknown Doctor",
      email: a.doctorId?.email || "",
      appointmentDate: a.appointmentDate,
      appointmentTime: a.appointmentTime,
    }));

    res.json({ success: true, doctors: result });
  } catch (err) {
    console.error("getAcceptedDoctors error:", err);
    res.status(500).json({ error: "Failed to fetch accepted doctors" });
  }
};


/**
 * ✅ Get appointments for chat sidebar (doctor or patient)
 */
export const mychats = async (req, res) => {
  const { userId, userModel } = req.params;
  try {
    const normalizedModel = userModel === "Doctor" ? "docregmodels" : "patients";

    const filter =
      normalizedModel === "docregmodels" ? { doctorId: userId } : { patientId: userId };

    const chats = await appointment
      .find(filter)
      .sort({ updatedAt: -1 })
      .populate(
        normalizedModel === "docregmodels" ? "patientId" : "doctorId",
        "fullName email"
      );

    const formatted = chats.map((c) => ({
      appointmentId: c._id,
      name: normalizedModel === "docregmodels" ? c.patientId?.fullName : c.doctorId?.fullName,
      email: normalizedModel === "docregmodels" ? c.patientId?.email : c.doctorId?.email,
      status: c.status,
      appointmentDate: c.appointmentDate,
      appointmentTime: c.appointmentTime,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("myChats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Get chat messages for an appointment (alternate)
 */
export const chatMessageAppointment = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ appointmentId: req.params.appointmentId })
      .sort({ createdAt: 1 })
      .populate("senderId", "fullName email");

    res.json({ success: true, messages });
  } catch (err) {
    console.error("chatMessageAppointment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};