import mongoose, { Schema } from "mongoose";

const bookAppointmentSchema = new Schema({
    name:{
        type:String,
        required: true 
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    contactNo:{
        type:Number,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    specialization:{
        type:String,
        required:true
    },
    doctorName:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:String,
        required:true
    },
    appointmentTime:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    medicalHistory:{
        type:String,
        required:true
    }
});

export const appointment = mongoose.model('appointment',bookAppointmentSchema);