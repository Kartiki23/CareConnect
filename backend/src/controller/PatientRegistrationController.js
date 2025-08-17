// backend/src/controller/PatientRegistrationController.js
import bcrypt from "bcrypt";
import { Patient } from "../model/PatientRegistrationModel.js";

export const registerPatient = async (req, res) => {
  try {
    const {
      fullName, gender, age, email, phone, password,
      addressLine = "", city = "", state = "", postalCode = "", country = "",
      latitude, longitude
    } = req.body;

    if (!fullName || !gender || !age || !email || !phone || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const existing = await Patient.findOne({ email });
    if (existing) return res.status(400).json({ message: "Patient already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const patientPhoto = req.file?.filename || null;

    const lng = longitude ? Number(longitude) : 0;
    const lat = latitude  ? Number(latitude)  : 0;

    const doc = new Patient({
      fullName, gender, age, email, phone, password: hashed,
      addressLine, city, state, postalCode, country,
      location: { type: 'Point', coordinates: [lng, lat] },
      patientPhoto
    });

    await doc.save();

    return res.status(201).json({
      message: "Patient registered successfully",
      patientId: doc._id
    });
  } catch (err) {
    console.error("Register Patient Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};