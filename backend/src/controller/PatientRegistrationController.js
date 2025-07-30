

import { Patient } from "../model/PatientRegistrationModel.js";

export const registerPatient = async (req, res) => {
  try {
    console.log("received data:",req.body);
    
    const { fullName, gender, age, email, phone, password } = req.body;

    const existing = await Patient.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Patient already registered" });
    }

    const newPatient = new Patient({ fullName, gender, age, email, phone, password });
    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully", patient: newPatient });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};