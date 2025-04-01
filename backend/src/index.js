import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import {connectDB} from './lib/db.js'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

import {app,server} from "./lib/socket.js"
import path from "path"

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve()

// Middlewares
app.use(express.json())
app.use(cookieParser())
// To communicate with different services/ports
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

// Use the static assets created by build if in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    // For any routes other than auth & message we see our application
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

// Web socket server
server.listen(PORT, () =>{
    console.log(`Server started at port:${PORT}`)
    connectDB()
})