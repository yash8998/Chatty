import express from "express"
import {getUsersForSidebar, getMessages, sendMessage} from "../controllers/message.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router =  express.Router()

// Get friends
router.get("/users",protectRoute, getUsersForSidebar)

// Get messages between two users
router.get("/:id",protectRoute, getMessages)

//send message
router.post("/send/:id",protectRoute,sendMessage)

export default router