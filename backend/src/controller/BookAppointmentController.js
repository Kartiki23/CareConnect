import { appointment } from "../model/BookAppointmentModel.js";

export const bookAppointment = async (req,res) => {

    try {
        const{name,email,contactNo,gender,age,specialization,doctorName,appointmentDate,appointmentTime, reason,medicalHistory} = req.body

        if(!name || !email || !contactNo || !gender || !age || !specialization || !doctorName || !appointmentDate || !appointmentTime || !reason || !medicalHistory){
            return res.status(400).json({message:"All fields are requried !!"});
        }

        const newAppointment = new appointment({
            name,
            email,
            contactNo,
            gender,
            age,
            specialization,
            doctorName,
            appointmentDate,
            appointmentTime,
            reason,
            medicalHistory
        })

        await newAppointment.save()

        res.status(201).json({message:"Appointment Booked Successfully!!" })
        
    } catch (error) {
        console.log(error);
        res.status(501).json({message:"Server Error"})
    }
}