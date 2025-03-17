import { generateTokens } from "../lib/utils.js"
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
            generateTokens(newUser._id, res)
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
    res.send("Sign up Page")
}

export async function handleUserLogout(req,res) {
    res.send("Sign up Page")
}

