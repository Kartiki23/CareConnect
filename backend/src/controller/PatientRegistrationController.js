import bcrypt from "bcrypt";
import { Patient } from "../model/PatientRegistrationModel.js";

// Register new patient
export const registerPatient = async (req, res) => {
  try {
    const { fullName, gender, age, email, phone, password } = req.body;

    // Validate required fields
    if (!fullName || !gender || !age || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle optional profile photo
    let patientPhoto = null;
    if (req.file) {
      patientPhoto = req.file.filename; // Make sure you use multer to handle file uploads
    }

    // Create new patient
    const newPatient = new Patient({
      fullName,
      gender,
      age,
      email,
      phone,
      password: hashedPassword,
      patientPhoto, // will be null if no photo uploaded
    });

    await newPatient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patientId: newPatient._id,
    });
  } catch (error) {
    console.error("Register Patient Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
