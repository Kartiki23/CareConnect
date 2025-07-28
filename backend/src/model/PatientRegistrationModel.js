

import mongoose, { Schema } from 'mongoose';


 export const patientSchema = new Schema({
  fullName: { type: String, required: true },

  gender: { type: String, required: true },

  age: { type: Number, required: true },

  email: { type: String, required: true, unique: true },

  phone: { type: String, required: true },

  password: { type: String, required: true }
}, {
  timestamps: true
});

export const Patient = mongoose.model("Patient", patientSchema);