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
      consultationFee // 💰 New field
    } = req.body;

    console.log(" req.body:", req.body);
    console.log("req.files:", req.files);

    // File uploads
    const licensePhoto = req.files?.licensePhoto?.[0]?.filename || "";
    const doctorPhoto = req.files?.doctorPhoto?.[0]?.filename || "";

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
      !doctorPhoto ||
      consultationFee === undefined
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

    // Save doctor
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
      doctorPhoto,
      consultationFee // 💰 Save fee
    });

    await newDoctor.save();

    res.status(201).json({
      message: "Doctor registered successfully.",
      doctor: {
        _id: newDoctor._id,
        fullName: newDoctor.fullName,
        email: newDoctor.email,
        doctorPhoto: newDoctor.doctorPhoto,
        consultationFee: newDoctor.consultationFee // 💰 Send fee in response
      }
    });
  } catch (error) {
    console.log("Registration Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    // 💰 Also return consultationFee
    const doctors = await docRegModel.find({}, 'fullName specialization consultationFee');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctors', error });
  }
};
