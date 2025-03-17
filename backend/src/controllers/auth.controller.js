import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export async function handleUserSignUp(req,res) {
    const {fullName, email, password} = req.body

    try{
        // Check if all fields have been filled
        if(!fullName || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        // Check password validity
        if(password.length < 6){
            return res.status(400).json({
                message: "Password must be atleast 6 characters"
            })
        }

        // Check if user exists
        const user = await User.findOne({email})
        if (user){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // Create User
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })

        if(newUser){
            // generate jwt
            generateToken(newUser._id, res)
            await newUser.save() 

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }else{
            return res.status(400).json({
                message: "Invalid user data"
            })
        }

    }catch(error){
        console.log("Error in Signup controller", error.message)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export async function handleUserLogin(req,res) {
    const {email, password} = req.body

    try{
        //Check if User exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        // Validate Password
        const isCorrect = await bcrypt.compare(password, user.password)
        if(!isCorrect){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        // Proceed with JWT
        generateToken(user._id,res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    }catch(error){
        console.log("Error in login controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export function handleUserLogout(req,res) {
    try{
        // Expire cookies
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "User logged out"})
    }catch(error){
        console.log("Error in logout controller", error.message)
    }
}

export function handleUpdateProfile(req,res) {
    try{
        // Expire cookies
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "User logged out"})
    }catch(error){
        console.log("Error in logout controller", error.message)
    }
}

