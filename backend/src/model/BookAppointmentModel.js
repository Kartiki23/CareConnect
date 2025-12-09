import mongoose, { Schema } from "mongoose";

const bookAppointmentSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  doctorId: { 
    type: Schema.Types.ObjectId, 
    ref: 'docregmodels', 
    required: true 
  },

  // 💰 New field for storing fee at booking time
    consultationFeeAtBooking: { 
        type: Number, 
        required: true 
    },
  appointmentDate: {
    type: String,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  medicalHistory: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'patients',
    required: true
  },
   paymentMethod: { 
    type: String, 
    default: "Cash" 
    }, // always "Cash" here
  paymentStatus: {
  type: String,
  enum: ["Pending", "Paid"],
  default: "Pending"
}
}, { timestamps: true });

export const appointment = mongoose.model('appointment', bookAppointmentSchema);
