import express from "express"
import {handleUserLogin,handleUserSignUp,handleUserLogout, handleUpdateProfile} from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router =  express.Router()

// Signup
router.post('/signup',handleUserSignUp)

// Login
router.post('/login', handleUserLogin)

// Logout
router.post('/logout',handleUserLogout)

//update profile pic
//protectRoute is middle ware to check if user is authenticated
router.put("/update-profile", protectRoute, handleUpdateProfile)

export default router