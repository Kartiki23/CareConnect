import express from "express";

import { getNotifications, markAsRead } from "../controller/AppointmentNotificationController.js";
import { authenticateDoctor } from "../middleware/LoginMiddleware.js";

const appointmentNotificationRoute = express.Router();

// Get all doctor notifications
appointmentNotificationRoute.get("/notifications/:doctorId", authenticateDoctor, getNotifications);

// Mark single notification as read
appointmentNotificationRoute.put("/notifications/read/:id", authenticateDoctor, markAsRead);

export default appointmentNotificationRoute;
