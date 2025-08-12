// src/model/PatientMessageModel.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true, index: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "patients" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "docregmodels" },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });


export const MessageModel = mongoose.model("messages", messageSchema);

export const messageModel= mongoose.model('messageModel',messageSchema);
//export default mongoose.model("Message", messageSchema);
