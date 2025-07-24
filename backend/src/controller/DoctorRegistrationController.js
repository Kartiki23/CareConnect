
import bcrypt from "bcrypt";
import { docRegModel } from "../model/DoctorRegistrationModel.js";


export const registerDoctor = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      age,
      email,
      phone,
      aadharNumber,
      password,
      specialization,
      hospital,
      licenseNumber,
    } = req.body;

    console.log("Request files:",req.files);

    // File uploads
    const licensePhoto = req.files?.licensePhoto?.[0]?.filename || "";
    const profilePhoto = req.files?.profilePhoto?.[0]?.filename || "";

    // Validate required fields
    if (
      !fullName ||
      !gender ||
      !age ||
      !email ||
      !phone ||
      !aadharNumber ||
      !password ||
      !specialization ||
      !hospital ||
      !licenseNumber ||
      !licensePhoto ||
      !profilePhoto
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if already registered
    const existingUser = await docRegModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Doctor already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save doctor
    const newDoctor = new docRegModel({
      fullName,
      gender,
      age,
      email,
      phone,
      aadharNumber,
      password: hashedPassword,
      specialization,
      hospital,
      licenseNumber,
      licensePhoto,
      profilePhoto,
    });

    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully." });
  } catch (error) {
    console.log("Registration Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};