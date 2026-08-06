const notificationModel = require("../models/notification.model");
const userModel = require("../models/user.model");

async function getNotificationsController(req, res) {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // If email is not verified, check if we need to send/create a new reminder notification
        if (!user.isEmailVerified) {
            const lastNotification = await notificationModel.findOne({
                user: userId,
                type: "EMAIL_VERIFICATION"
            }).sort({ createdAt: -1 });

            const twentyFourHours = 24 * 60 * 60 * 1000;
            const needsNewNotification = !lastNotification || 
                (Date.now() - new Date(lastNotification.createdAt).getTime() > twentyFourHours);

            if (needsNewNotification) {
                await notificationModel.create({
                    user: userId,
                    type: "EMAIL_VERIFICATION",
                    message: "Please verify your email address to access all features."
                });
            }
        }

        const notifications = await notificationModel.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Notifications fetched successfully",
            notifications
        });
    } catch (err) {
        console.error("Error in getNotificationsController:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}

async function markAllReadController(req, res) {
    try {
        const userId = req.user.id;

        await notificationModel.updateMany(
            { user: userId, isRead: false },
            { $set: { isRead: true } }
        );

        res.status(200).json({
            message: "All notifications marked as read."
        });
    } catch (err) {
        console.error("Error in markAllReadController:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}

async function clearAllNotificationsController(req, res) {
    try {
        const userId = req.user.id;

        await notificationModel.deleteMany({ user: userId });

        res.status(200).json({
            message: "All notifications cleared."
        });
    } catch (err) {
        console.error("Error in clearAllNotificationsController:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    getNotificationsController,
    markAllReadController,
    clearAllNotificationsController
};
