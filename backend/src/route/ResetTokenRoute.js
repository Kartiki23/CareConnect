// backend/routes/authRoutes.js
import express from "express";
import { resetPasswordCommon } from "../controller/ResetTokenController.js";


const resetTokenRoute = express.Router();

resetTokenRoute.post("/reset-password", resetPasswordCommon);

export default resetTokenRoute;
