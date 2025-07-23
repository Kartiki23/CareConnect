import mongoose from "mongoose";

const mongoURL='mongodb+srv://srushti:srushti007@cluster0.r2euq5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
export const connectDB= async()=>{
    try{
        await mongoose.connect(mongoURL);
        console.log("mongoosDB connected sucessfully")
    }
    catch(error){
        console.log(error)
    }
}