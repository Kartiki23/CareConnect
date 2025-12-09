// src/model/PatientRegistrationModel.js
// backend/src/model/PatientRegistrationModel.js
import mongoose, { Schema } from 'mongoose';

const pointSchema = new Schema({
  type: { type: String, enum: ['Point'], default: 'Point' },
  coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
}, { _id: false });

export const patientSchema = new Schema({
  fullName: { type: String, required: true },
  gender:   { type: String, required: true },
  age:      { type: Number, required: true },
  email:    { type: String, required: true, unique: true },
  phone:    { type: String, required: true },
  password: { type: String, required: true },

  // 👇 NEW: address fields
  addressLine:  { type: String, default: '' },
  city:         { type: String, default: '' },
  state:        { type: String, default: '' },
  postalCode:   { type: String, default: '' },
  country:      { type: String, default: '' },
  location:     { type: pointSchema, default: () => ({ type: 'Point', coordinates: [0, 0] }) },

  // photo (optional)
  patientPhoto: { type: String, default: null },
}, { timestamps: true });

patientSchema.index({ location: '2dsphere' });

export const Patient = mongoose.model("patients", patientSchema);