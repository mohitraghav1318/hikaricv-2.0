const { Router } = require('express')
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const rateLimitMiddleware = require("../middlewares/rateLimit.middleware")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", rateLimitMiddleware.registerLimiter, authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", rateLimitMiddleware.loginLimiter, authController.loginUserController)


/**
 * @route POST /api/auth/forgot-password
 * @description send a password reset email when the account exists
 * @access Public
 */
authRouter.post("/forgot-password", rateLimitMiddleware.forgotPasswordLimiter, authController.forgotPasswordController)


/**
 * @route POST /api/auth/reset-password/:token
 * @description reset password with a valid password reset token
 * @access Public
 */
authRouter.post("/reset-password/:token", rateLimitMiddleware.resetPasswordLimiter, authController.resetPasswordController)


/**
 * @route GET /api/auth/verify-email/:token
 * @description verify a user's email address with a valid verification token
 * @access Public
 */
authRouter.get("/verify-email/:token", authController.verifyEmailController)


/**
 * @route POST /api/auth/resend-verification
 * @description resend email verification when an unverified account exists
 * @access Public
 */
authRouter.post("/resend-verification", rateLimitMiddleware.forgotPasswordLimiter, authController.resendVerificationController)


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout", authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)


module.exports = authRouter
