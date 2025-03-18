import User from "../models/user.model.js"
import Message from "../models/message.model.js"

export async function getUsersForSidebar(req,res){
    try{
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password") //$ne is not equal to

        res.status(200).json(filteredUsers)

    }catch(error){
        console.log("Error in getUsersForSidebar controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export async function getMessages(req,res){
    try{
        const {id: userToChatId} = req.params
        const myId = req.user._id

        // Find all messages where receiver is me or when I am the sender and same for other user
        const messages = await Message.find({
            $or:[
                {
                    senderId: myId,
                    receiverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    receiverId: myId
                },
            ]
        })
        res.status(200).json(messages)

    }catch(error){
        console.log("Error in getMessage controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export async function sendMessage(req,res){
    try{
        const {text, image} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

        // Check if message has image
        let imageUrl
        if (image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        // Create message object
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        // TODO: realtime functionality goes here => socket.io
        res.status(201).json(newMessage)

    }catch(error){
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}