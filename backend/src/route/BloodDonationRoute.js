import express from "express";
import { createDonation, deleteDonor, getDonationsByPatient, getDonors, submitBloodDonation } from "../controller/BloodDonationController.js";


const bloodDonationRoute = express.Router();

// POST /api/blood-donation/submit
bloodDonationRoute.post("/bloodDonationForm", submitBloodDonation);
bloodDonationRoute.get("/donors", getDonors); 
bloodDonationRoute.delete("/donors/:id", deleteDonor);
bloodDonationRoute.post("/donate", createDonation);
bloodDonationRoute.get("/my-donations", getDonationsByPatient);

export default bloodDonationRoute;
