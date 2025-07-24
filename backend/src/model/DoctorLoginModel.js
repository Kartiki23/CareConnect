import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minLength:6
    }

},
{
    timestamps: true,
}
);

export const docLogin = mongoose.model('docLogin',userSchema);