import { messagesaver } from "../model/ContactModel.js";
import nodemailer from "nodemailer";

export const contact = async (req,res) =>{

    const { name, email, message } = req.body;

  try {
    // 1️⃣ Save to MongoDB
    const newMessage = new messagesaver({ name, email, message });
    await newMessage.save();

    // 2️⃣ Send Email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,   
        pass: process.env.EMAIL_PASS    
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.USER_EMAIL,      
      subject: `📩 New Contact from ${name}`,
      text: `Message: ${message}\n\nFrom: ${name} (${email})`,
    });

    res.json({ success: true, msg: "Message sent & saved successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, msg: "Error processing message" });
  }
}

// get message 
export const getMessage = async () =>{
     try {
    const messages = await messagesaver.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch messages" });
  }
}