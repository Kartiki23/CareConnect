// src/model/PatientMessageModel.js
import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel", // ✅ dynamically reference Doctor or Patient
    },
    senderModel: {
      type: String,
      enum: ["docregmodels", "patients"], // ✅ your doctor & patient models
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true, // ✅ avoids unwanted spaces
    },
    readBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "senderModel",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ], // ✅ tracks who read & when
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt automatically
  }
);

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
