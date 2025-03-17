import express from "express"
import {handleUserLogin,handleUserSignUp,handleUserLogout} from "../controllers/auth.controller.js"

const router =  express.Router()

// Signup
router.post('/signup',handleUserSignUp)

// Login
router.post('/login', handleUserLogin)

// Logout
router.get('/logout',handleUserLogout)

export default router