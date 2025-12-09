import mongoose from "mongoose";

const bloodDonationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  donationType:{ type: String, required: true},
  lastDonation: { type: Date },
  healthIssues: { type: String },
  address: { type: String, required: true },
}, { timestamps: true });

export const BloodDonation = mongoose.model("BloodDonation", bloodDonationSchema);

