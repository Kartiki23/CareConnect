// src/controllers/messagesController.js
//import { Message } from "../models/MessageModel.js";
import { docRegModel } from "../model/DoctorRegistrationModel.js"; // optional: to get doctor details
import { Patient } from "../model/PatientRegistrationModel.js";   // optional: to get patient details
import { messageModel } from "../model/PatientMessageModel.js";

// GET contacts for a user (with last message preview)
export const getContacts = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "userId required" });

    // Find last message per conversation (otherParty)
    const agg = await messageModel.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }]
        }
      },
      {
        $project: {
          senderId: 1,
          receiverId: 1,
          content: 1,
          createdAt: 1,
          other: {
            $cond: [{ $eq: ["$senderId", userId] }, "$receiverId", "$senderId"]
          }
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$other",
          lastMessage: { $first: "$content" },
          lastAt: { $first: "$createdAt" },
          lastSender: { $first: "$senderId" }
        }
      },
      { $sort: { lastAt: -1 } }
    ]);

    // Optionally fetch names/avatars for contacts (doctor or patient)
    const contacts = await Promise.all(
      agg.map(async (c) => {
        let name = c._id;
        let avatar = null;

        try {
          const doc = await docRegModel
            .findOne({ email: c._id })
            .select("fullName doctorPhoto email")
            .lean();

          if (doc) {
            name = doc.fullName;
            avatar = doc.doctorPhoto ? `/uploads/${doc.doctorPhoto}` : null;
          } else {
            const pat = await Patient
              .findOne({ email: c._id })
              .select("fullName")
              .lean();

            if (pat) {
              name = pat.fullName;
            }
          }
        } catch (err) {
          console.warn("Error fetching contact details for:", c._id, err);
        }

        return {
          _id: c._id,
          name,
          avatar,
          lastMessage: c.lastMessage,
          lastAt: c.lastAt,
          lastSender: c.lastSender
        };
      })
    );

    res.json(contacts);
  } catch (err) {
    console.error("getContacts:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET messages (conversation) between userId and contactId
export const getConversation = async (req, res) => {
  try {
    const { contactId } = req.params;
    const userId = req.query.userId;

    if (!userId || !contactId) {
      return res.status(400).json({ message: "userId and contactId required" });
    }

    const msgs = await Message.find({
      $or: [
        { senderId: userId, receiverId: contactId },
        { senderId: contactId, receiverId: userId }
      ]
    })
      .sort({ createdAt: 1 })
      .lean();

    res.json(msgs);
  } catch (err) {
    console.error("getConversation:", err);
    res.status(500).json({ message: "Server error" });
  }
};