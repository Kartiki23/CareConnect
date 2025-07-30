import express from "express";
import { loginPatient } from "../controller/PatientLoginController.js";

const router = express.Router();

router.post("/Plogin", loginPatient);

export default router;