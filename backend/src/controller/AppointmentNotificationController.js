import { notification } from "../model/AppointmentNotificationModel.js";


export const getNotifications = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const notifications = await notification.find({ doctorId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notifications = await notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
