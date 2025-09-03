// backend/src/model/DoctorRegistrationModel.js
import mongoose, { Schema } from 'mongoose';

const pointSchema = new Schema({
  type: { type: String, enum: ['Point'], default: 'Point' },
  coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
}, { _id: false });

export const docRegSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  gender:   { type: String, required: true, trim: true },
  age:      { type: Number, required: true },
  phone:    { type: String, required: true, trim: true, minlength: 10, maxlength: 10, unique: true },
  aadharNumber: { type: String, required: true, trim: true, minlength: 12, maxlength: 12, unique: true },
  email:    { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true, minlength: 6 },
  specialization: { type: String, required: true, trim: true },
  hospital: { type: String, required: true, trim: true },
  licenseNumber: { type: String, required: true, trim: true, unique: true },
  licensePhoto:  { type: String, required: true },
  doctorPhoto:   { type: String, required: true },
  consultationFee: { type: Number, default: 0 },

  // 👇 NEW: clinic address + coords
  addressLine:  { type: String, default: '' },
  city:         { type: String, default: '' },
  state:        { type: String, default: '' },
  postalCode:   { type: String, default: '' },
  country:      { type: String, default: '' },
  location:     { type: pointSchema, default: () => ({ type: 'Point', coordinates: [0, 0] }) },
}, { timestamps: true });

docRegSchema.index({ location: '2dsphere' });

export const docRegModel = mongoose.model('docregmodels', docRegSchema);