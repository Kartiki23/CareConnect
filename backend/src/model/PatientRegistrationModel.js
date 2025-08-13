

import mongoose, { Schema } from 'mongoose';


 export const patientSchema = new Schema({
  
  fullName: { type: String, required: true },

  gender: { type: String, required: true },

  age: { type: Number, required: true },

  email: { type: String, required: true, unique: true },

  phone: { type: String, required: true },

  password: { type: String, required: true },
  patientPhoto: {
      type: String, // stores filename of uploaded photo
      default: null, // optional, can be null if no photo uploaded
    },
}, {
  timestamps: true
});

export const Patient = mongoose.model("patients", patientSchema);