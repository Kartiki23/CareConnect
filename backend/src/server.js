import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";

// Routes
import authRoutes from './route/DoctorRegistrationRoute.js';
import docLoginRouter from './route/DoctorLoginRoute.js';
import patientloginRoutes from './route/PatientLoginRoute.js';
import patientRegisterrouter from './route/PatientRegistrationRoute.js';
import docDashboardRouter from './route/DoctorDashboardRoute.js';
import specialtiesRouter from './route/SpecialtiesRoute.js';
import donationRoute from './route/DonatinRoute.js';
import bookAppointmentRoute from './route/BookAppointmentRoute.js';
import patientDashboardRoute from './route/PatientDashboardRoute.js';
import patientMessageRoutes from './route/PatientMessageRoute.js';
import resetTokenRoute from './route/ResetTokenRoute.js';

import { connectDB } from './config/Db.js';
import { ChatMessage } from './model/PatientMessageModel.js';
import locationRoute from './route/LocationRoute.js';
import bloodDonationRoute from './route/BloodDonationRoute.js';
import contactRoute from './route/ContactRoute.js';
import appointmentNotificationRoute from './route/AppintmentNotificationRoute.js';

dotenv.config();
connectDB();

const app = express();

// ✅ Fix CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/user", contactRoute);
app.use("/api/v1/user", docLoginRouter);
app.use("/api/v1/user", patientloginRoutes);
app.use("/api/v1/user", patientRegisterrouter);
app.use("/api/v1/user", docDashboardRouter);
app.use("/api/v1/user", specialtiesRouter);
app.use("/api/v1/user", donationRoute);
app.use("/api/v1/user", appointmentNotificationRoute);
app.use("/api/v1/user", bookAppointmentRoute);
app.use("/api/v1/user", patientDashboardRoute);
app.use("/api/v1/user", resetTokenRoute);
app.use("/api/v1/user", bloodDonationRoute);
app.use("/api/v1/chat", patientMessageRoutes);
app.use("/api/v1/location", locationRoute);

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

// -------------------- Socket.IO -------------------- //
const io = new Server(server, {
  cors: { 
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] 
  }
});

// ✅ Store online doctors
let onlineDoctors = {};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // ---------------- Doctor Online Tracking ----------------
  socket.on("doctorOnline", (doctorId) => {
    onlineDoctors[doctorId] = socket.id;
    console.log(`👨‍⚕️ Doctor ${doctorId} is online with socket ${socket.id}`);
  });

  // ---------------- Appointment Chat Rooms ----------------
  socket.on("joinRoom", async ({ appointmentId, userId }) => {
    socket.join(appointmentId);
    console.log(`🔹 ${socket.id} joined room ${appointmentId}`);

    try {
      await ChatMessage.updateMany(
        { appointmentId, "readBy.userId": { $ne: userId } },
        { $push: { readBy: { userId, readAt: new Date() } } }
      );
    } catch (err) {
      console.error("joinRoom error:", err.message);
    }
  });

  socket.on("leaveRoom", ({ appointmentId }) => {
    socket.leave(appointmentId);
    console.log(`🔸 ${socket.id} left room ${appointmentId}`);
  });

  // ---------------- Chat Message ----------------
  socket.on("sendMessage", async (msg) => {
    try {
      const { appointmentId, senderId, senderModel, message } = msg;
      if (!appointmentId || !senderId || !message || !senderModel) return;

      const chatMessage = new ChatMessage({
        appointmentId,
        senderId,
        senderModel,
        message,
        readBy: [{ userId: senderId, readAt: new Date() }]
      });

      const savedMessage = await chatMessage.save();

      io.to(appointmentId).emit("receiveMessage", savedMessage);
    } catch (err) {
      console.error("sendMessage error:", err.message);
    }
  });

  // ---------------- Disconnect ----------------
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    // Remove doctor from online list if disconnected
    for (const [docId, sockId] of Object.entries(onlineDoctors)) {
      if (sockId === socket.id) {
        delete onlineDoctors[docId];
        console.log(`⚠️ Doctor ${docId} went offline`);
      }
    }
  });
});

// ✅ Make io & onlineDoctors accessible to routes
app.use((req, res, next) => {
  req.io = io;
  req.onlineDoctors = onlineDoctors;
  next();
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
