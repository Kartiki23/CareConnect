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
      consultationFee,
      address,          // 🆕 from frontend
      locationLat,      // 🆕 from frontend
      locationLng       // 🆕 from frontend
    } = req.body;

    const licensePhoto = req.files?.licensePhoto?.[0]?.filename || "";
    const doctorPhoto  = req.files?.doctorPhoto?.[0]?.filename || "";

    if (
      !fullName || !gender || !age || !email || !phone || !aadharNumber ||
      !password || !specialization || !hospital || !licenseNumber ||
      !licensePhoto || !doctorPhoto || consultationFee === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await docRegModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Doctor already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // build location object (lng, lat!)
    const lngNum = Number(locationLng);
    const latNum = Number(locationLat);

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
      consultationFee: Number(consultationFee),
      address: address || "",
      location:
        Number.isFinite(lngNum) && Number.isFinite(latNum)
          ? { type: "Point", coordinates: [lngNum, latNum] }
          : { type: "Point", coordinates: [0, 0] },
    });

    await newDoctor.save();

    res.status(201).json({
      message: "Doctor registered successfully.",
      doctor: {
        _id: newDoctor._id,
        fullName: newDoctor.fullName,
        email: newDoctor.email,
        consultationFee: newDoctor.consultationFee,
        address: newDoctor.address,
        location: newDoctor.location,
      },
    });
  } catch (error) {
    console.log("Registration Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await docRegModel.find({}, "fullName specialization consultationFee address location");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error });
  }
};

// 🆕 update location endpoint (optional, for DoctorProfile)
export const updateDoctorLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, locationLat, locationLng } = req.body;

    const lngNum = Number(locationLng);
    const latNum = Number(locationLat);

    const updated = await docRegModel.findByIdAndUpdate(
      id,
      {
        address: address || "",
        location:
          Number.isFinite(lngNum) && Number.isFinite(latNum)
            ? { type: "Point", coordinates: [lngNum, latNum] }
            : undefined,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Doctor not found" });

    res.json({
      message: "Location updated",
      doctor: {
        _id: updated._id,
        address: updated.address,
        location: updated.location,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};