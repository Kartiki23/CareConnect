import mongoose, { Schema } from 'mongoose';

export const docRegSchema = new Schema({
  fullName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  gender: { 
    type: String, 
    required: true, 
    trim: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
  aadharNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 12,
    maxlength: 12,
    unique: true,
  },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true, 
    trim: true, 
    minlength: 6 
  },
  specialization: { 
    type: String, 
    required: true, 
    trim: true 
  },
  hospital: { 
    type: String, 
    required: true, 
    trim: true 
  },
  licenseNumber: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true 
  },
  licensePhoto: { 
    type: String, 
    required: true 
  },
  doctorPhoto: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

export const docRegModel = mongoose.model('docRegModel', docRegSchema);