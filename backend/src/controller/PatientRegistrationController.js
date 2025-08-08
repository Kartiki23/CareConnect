
import bcrypt from "bcrypt";
import { Patient } from "../model/PatientRegistrationModel.js";

export const registerPatient = async (req, res) => {
  try {
    console.log("received data:",req.body);
    
    const { fullName, gender, age, email, phone, password , patientPhoto} = req.body;

    const existing = await Patient.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Patient already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({ 
      fullName, 
      gender, 
      age, 
      email, 
      phone, 
      password : hashedPassword,
      patientPhoto,
    });
    await newPatient.save();

     res.status(201).json({ message: "Patient registered successfully.",
      doctor:{
        _id:newPatient._id,
        fullName:newPatient.fullName,
        email:newPatient.email,
        patientPhoto:newDoctor.patientPhoto,
      }
     });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};