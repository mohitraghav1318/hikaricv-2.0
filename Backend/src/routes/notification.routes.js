const { Router } = require("express");
const notificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const notificationRouter = Router();

/**
 * @route GET /api/notifications
 * @description Get all notifications of the logged in user
 * @access Private
 */
notificationRouter.get("/", authMiddleware.authUser, notificationController.getNotificationsController);

/**
 * @route POST /api/notifications/mark-read
 * @description Mark all notifications of the logged in user as read
 * @access Private
 */
notificationRouter.post("/mark-read", authMiddleware.authUser, notificationController.markAllReadController);

/**
 * @route DELETE /api/notifications
 * @description Delete all notifications of the logged in user
 * @access Private
 */
notificationRouter.delete("/", authMiddleware.authUser, notificationController.clearAllNotificationsController);

module.exports = notificationRouter;
