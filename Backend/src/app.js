const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

// Trust the reverse proxy to allow secure cookies
app.set("trust proxy", 1)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")
const notificationRouter = require("./routes/notification.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/notifications", notificationRouter)



module.exports = app