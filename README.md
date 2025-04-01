# Chatty - A Real-Time Chat Application

Welcome to **Chatty**, a real-time chat application built using the **MERN Stack** with **Zustand** for state management, **Cloudinary** for image storage, and deployed on **Render.com**.

## 🚀 Live Demo
🔗 [Chatty Live](https://chatty-1vh9.onrender.com)

## 📌 Features
- Real-time messaging using **Socket.io**
- User authentication (sign-up, login, logout)
- **Zustand** for efficient state management
- **Cloudinary** integration for image uploads in chat
- Responsive UI with chat bubbles and profile images
- Fully deployed on **Render.com**

## 🛠️ Tech Stack
### **Frontend:**
- React.js
- Zustand (state management)
- Tailwind CSS (for styling)

### **Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- Cloudinary (for image storage)
- Socket.io (for real-time communication)

### **Deployment:**
- Render.com (for both backend and frontend hosting)

## 🛠️ Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/chatty.git
   cd chatty
   ```

2. **Install dependencies**
   ```sh
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the **server** folder with:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```


## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

---
**Happy Coding! 🚀**

