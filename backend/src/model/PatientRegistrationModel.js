// src/model/PatientRegistrationModel.js
import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
  {
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    patientPhoto: {
      type: String,
      default: null,
    },
    // human readable address:
    address: { type: String, default: null },
    // GeoJSON Point: [lng, lat]
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
  },
  { timestamps: true }
);

// create 2dsphere index for geo queries
patientSchema.index({ location: "2dsphere" });

export const Patient = mongoose.model("patients", patientSchema);