import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        },
        text: {
            type: String,
        },
        profilePic: {
            type: String,
        },

    },
    {timestamps: true}
)

const Message = mongoose.model("Message", messageSchema)

export default Message