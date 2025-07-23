import mongoose, { Schema } from "mongoose";

export const doctorRegisterSchema = new Schema({
    fullName:{
        type:String,
        require:true,
        trim:true
    },
    gender:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
        min: 25,
        max: 80,
    },
    contactNo:{
        type:Number,
        required:true,
        trim:true,
        unique: true,
        length:10
    },
    aadharcardNo:{
         type: String,
        required: true,
        trim: true,
        length:12
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    specialization:{
        type: String,
        required: true,
        trim: true
    },
    hospitalName:{
        type: String,
        required: true,
        trim: true
    },
    licenseNo:{
        type: String,
        required: true,
        trim: true,
    },
    licensePhoto:{
        type: String, 
        required: false
    },
    doctorPhoto:{
        type: String, 
        required: false
    }

},
{
    timestamps: true,
}
);

export const doctorRegisterModel = mongoose.model('doctorRegisterModel ',doctorRegisterSchema);