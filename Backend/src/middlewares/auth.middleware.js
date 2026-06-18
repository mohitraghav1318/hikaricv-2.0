const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const userModel = require("../models/user.model")



async function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token."
        })
    }

}


async function requireVerifiedEmail(req, res, next) {
    const user = await userModel.findById(req.user.id)

    if (!user) {
        return res.status(401).json({
            message: "User not found."
        })
    }

    if (!user.isEmailVerified) {
        return res.status(403).json({
            message: "Please verify your email before using this feature."
        })
    }

    next()
}


module.exports = { authUser, requireVerifiedEmail }
