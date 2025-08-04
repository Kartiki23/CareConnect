import express from "express";
import { loginPatient } from "../controller/PatientLoginController.js";

const  patientloginRoutes= express.Router();

patientloginRoutes.post("/Plogin", loginPatient);

export default patientloginRoutes;