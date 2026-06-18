const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const tokenBlacklistModel = require("../models/blacklist.model")
const {
    sendPasswordResetEmail,
    sendEmailVerificationEmail
} = require("../services/email.service")



const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
        process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
}

const forgotPasswordSuccessMessage = "If an account with that email exists, a password reset link has been sent."
const resendVerificationSuccessMessage = "If an unverified account with that email exists, a verification link has been sent."

function hashToken(token) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")
}

function createRawToken() {
    return crypto.randomBytes(32).toString("hex")
}

async function sendVerificationEmail(user, rawToken) {
    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${rawToken}`

    await sendEmailVerificationEmail(user.email, user.username, verificationLink)
}

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const verificationToken = createRawToken()
    const hashedVerificationToken = hashToken(verificationToken)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        emailVerificationToken: hashedVerificationToken,
        emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000
    })

    try {
        await sendVerificationEmail(user, verificationToken)
    } catch (err) {
        console.log(err)
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, cookieOptions);


    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isEmailVerified: user.isEmailVerified
        }
    })

}


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isEmailVerified: user.isEmailVerified
        }
    })
}

/**
 * @name forgotPasswordController
 * @description generate a password reset token and send it by email when the account exists
 * @access Public
 */
async function forgotPasswordController(req, res) {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({
            message: "Please provide email"
        })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(200).json({
            message: forgotPasswordSuccessMessage
        })
    }

    const resetToken = createRawToken()
    const hashedResetToken = hashToken(resetToken)

    user.resetPasswordToken = hashedResetToken
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000

    await user.save()

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    try {
        await sendPasswordResetEmail(user.email, user.username, resetLink)
    } catch (err) {
        console.log(err)
    }

    res.status(200).json({
        message: forgotPasswordSuccessMessage
    })
}

/**
 * @name resetPasswordController
 * @description reset password with a valid unexpired reset token
 * @access Public
 */
async function resetPasswordController(req, res) {
    const { token } = req.params
    const { password } = req.body

    if (!password) {
        return res.status(400).json({
            message: "Please provide password"
        })
    }

    const hashedResetToken = hashToken(token)

    const user = await userModel.findOne({
        resetPasswordToken: hashedResetToken,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(400).json({
            message: "Password reset token is invalid or has expired"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    user.password = hash
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    res.status(200).json({
        message: "Password reset successfully"
    })
}

/**
 * @name verifyEmailController
 * @description verify a user's email address with a valid unexpired token
 * @access Public
 */
async function verifyEmailController(req, res) {
    const { token } = req.params

    const hashedVerificationToken = hashToken(token)

    const user = await userModel.findOne({
        emailVerificationToken: hashedVerificationToken,
        emailVerificationExpires: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(400).json({
            message: "Email verification token is invalid or has expired"
        })
    }

    user.isEmailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpires = undefined

    await user.save()

    res.status(200).json({
        message: "Email verified successfully"
    })
}

/**
 * @name resendVerificationController
 * @description generate a new email verification token when an unverified account exists
 * @access Public
 */
async function resendVerificationController(req, res) {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({
            message: "Please provide email"
        })
    }

    const user = await userModel.findOne({ email })

    if (!user || user.isEmailVerified) {
        return res.status(200).json({
            message: resendVerificationSuccessMessage
        })
    }

    const verificationToken = createRawToken()
    const hashedVerificationToken = hashToken(verificationToken)

    user.emailVerificationToken = hashedVerificationToken
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000

    await user.save()

    try {
        await sendVerificationEmail(user, verificationToken)
    } catch (err) {
        console.log(err)
    }

    res.status(200).json({
        message: resendVerificationSuccessMessage
    })
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

   res.clearCookie("token", {
    ...cookieOptions,
    maxAge: undefined
})

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)



    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isEmailVerified: user.isEmailVerified
        }
    })

}



module.exports = {
    registerUserController,
    loginUserController,
    forgotPasswordController,
    resetPasswordController,
    verifyEmailController,
    resendVerificationController,
    logoutUserController,
    getMeController
}
