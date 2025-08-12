
// src/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/Db.js";

import authRoutes from "./route/DoctorRegistrationRoute.js";
import docLoginRouter from "./route/DoctorLoginRoute.js";
import patientloginRoutes from "./route/PatientLoginRoute.js";
import patientRegisterrouter from "./route/PatientRegistrationRoute.js";
import docDashboardRouter from "./route/DoctorDashboardRoute.js";
import specialtiesRouter from "./route/SpecialtiesRoute.js";
import donationRoute from "./route/DonatinRoute.js";
import bookAppointmentRoute from "./route/BookAppointmentRoute.js";
import patientDashboardRoute from "./route/PatientDashboardRoute.js";


import express from 'express'
import authRoutes from './route/DoctorRegistrationRoute.js';
import { connectDB } from './config/Db.js';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import docLoginRouter from './route/DoctorLoginRoute.js';
import patientRoutes from './route/PatientRegistrationRoute.js'
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";
import specialtiesRouter from './route/SpecialtiesRoute.js';
import donationRoute from './route/DonatinRoute.js';
import docDashboardRouter from './route/DoctorDashboardRoute.js';
import bookAppointmentRoute from './route/BookAppointmentRoute.js';
import patientloginRoutes from './route/PatientLoginRoute.js';
import patientRegisterrouter from './route/PatientRegistrationRoute.js';
import patientDashboardRoute from './route/PatientDashboardRoute.js';
import patientMessageRoutes from './route/PatientMessageRoute.js';
import { getDoctorDashboard } from './controller/DoctorDashboardController.js';


const app = express()

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'http://localhost:3001',
        methods:['GET','POST']
    }
});

//app.use(express.urlencoded({ extended: true }));

import patientMessageRoutes from "./route/PatientMessageRoute.js";
import { MessageModel } from "./model/PatientMessageModel.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

connectDB();

const PORT = process.env.PORT || 3001;

// mount existing routes (keep your other imports/router uses)
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/user", docLoginRouter);
app.use("/api/v1/user", patientloginRoutes);
app.use("/api/v1/user", patientRegisterrouter);
app.use("/api/v1/user", docDashboardRouter);
app.use("/api/v1/user", specialtiesRouter);
app.use("/api/v1/user", donationRoute);
app.use("/api/v1/user", bookAppointmentRoute);
app.use("/api/v1/user", patientDashboardRoute);

// messages router
app.use("/api/v1/messages", patientMessageRoutes);

// Socket.IO real-time logic
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    if (!roomId) return;
    socket.join(roomId);
    // console.log(${socket.id} joined ${roomId});
  });

  // Client emits sendMessage with payload containing conversationId, senderId, receiverId, message/text
  socket.on("sendMessage", async (payload) => {
    try {
      if (!payload || !payload.conversationId) return;

      // Save to DB
      const doc = new MessageModel({
        conversationId: payload.conversationId,
        senderId: payload.senderId,
        receiverId: payload.receiverId,
        message: payload.message || payload.text || "",
      });
      await doc.save();

      // Emit to everyone in the room
      io.to(payload.conversationId).emit("receiveMessage", {
        conversationId: payload.conversationId,
        senderId: payload.senderId,
        receiverId: payload.receiverId,
        text: payload.message || payload.text || "",
        createdAt: doc.createdAt || new Date(),
      });
    } catch (err) {
      console.error("Socket sendMessage error:", err);
    }
  });

  socket.on("disconnect", () => {
    // console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});